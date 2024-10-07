<script>
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const statusDiv = document.getElementById('status');
    const imageCanvas = document.getElementById('imageCanvas');
    const annotationCanvas = document.getElementById('annotationCanvas');
    const ctx = imageCanvas.getContext('2d');
    const segmentationToggle = document.getElementById('segmentationToggle');
    const opacitySlider = document.getElementById('opacitySlider');
    const vesselList = document.getElementById('vesselList');
    const vesselLabel = document.getElementById('vesselLabel');
    const saveButton = document.getElementById('saveButton');
    const processButton = document.getElementById('processButton');
    const tools = document.querySelectorAll('.tool');

    let currentImage = null;
    let currentSegmentation = null;
    let annotations = {};
    let activeTool = 'brush';
    let serverPort = null;
    let isDrawing = false;

    // Function to fetch the port from the server
    async function fetchServerPort() {
        try {
            const response = await fetch('/get-port');
            const data = await response.json();
            serverPort = data.port;
            console.log(`Server is running on port: ${serverPort}`);
        } catch (error) {
            console.error('Failed to fetch server port:', error);
        }
    }

    // Call this function when the page loads
    fetchServerPort();

    // Enable directory upload
    fileInput.setAttribute('webkitdirectory', '');
    fileInput.setAttribute('directory', '');

    uploadForm.addEventListener('submit', processImages);
    saveButton.addEventListener('click', saveAnnotations);
    opacitySlider.addEventListener('input', updateOpacity);
    segmentationToggle.addEventListener('change', toggleSegmentation);

    tools.forEach(tool => {
        tool.addEventListener('click', () => {
            tools.forEach(t => t.classList.remove('active'));
            tool.classList.add('active');
            activeTool = tool.id.replace('Tool', '');
        });
    });

    annotationCanvas.addEventListener('mousedown', startDrawing);
    annotationCanvas.addEventListener('mousemove', draw);
    annotationCanvas.addEventListener('mouseup', stopDrawing);
    annotationCanvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function draw(e) {
        if (!isDrawing) return;

        const rect = annotationCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = annotationCanvas.getContext('2d');
        ctx.beginPath();
        if (activeTool === 'brush') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        } else if (activeTool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
        }
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    async function processImages(e) {
        e.preventDefault();
        statusDiv.textContent = 'Processing...';

        const formData = new FormData();
        for (const file of fileInput.files) {
            formData.append('files', file);
        }

        try {
            const response = await fetch(`http://localhost:${serverPort}/process`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            currentImage = await loadImage(result.image_url);
            currentSegmentation = await loadImage(result.segmentation_url);
            annotations = result.isolated_vessels;

            drawImage();
            updateVesselList();
            statusDiv.textContent = 'Processing complete!';
        } catch (error) {
            console.error('Error:', error);
            statusDiv.textContent = 'An error occurred during processing.';
        }
    }

    async function loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    function drawImage() {
        if (!currentImage) return;

        imageCanvas.width = currentImage.width;
        imageCanvas.height = currentImage.height;
        annotationCanvas.width = currentImage.width;
        annotationCanvas.height = currentImage.height;

        ctx.drawImage(currentImage, 0, 0);

        if (currentSegmentation && segmentationToggle.checked) {
            const segCtx = annotationCanvas.getContext('2d');
            segCtx.globalAlpha = opacitySlider.value;
            segCtx.drawImage(currentSegmentation, 0, 0);
            segCtx.globalAlpha = 1;
        }
    }

    function updateVesselList() {
        vesselList.innerHTML = '';
        for (const vesselId in annotations) {
            const li = document.createElement('li');
            li.textContent = annotations[vesselId].label || vesselId;
            li.addEventListener('click', () => highlightVessel(vesselId));
            vesselList.appendChild(li);
        }
    }

    function highlightVessel(vesselId) {
        const ctx = annotationCanvas.getContext('2d');
        drawImage();  // Reset the canvas

        if (annotations[vesselId]) {
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 2;
            ctx.strokeRect(
                annotations[vesselId].x,
                annotations[vesselId].y,
                annotations[vesselId].width,
                annotations[vesselId].height
            );
        }
    }

    function updateOpacity() {
        drawImage();
    }

    function toggleSegmentation() {
        drawImage();
    }

    async function saveAnnotations() {
        const annotationCtx = annotationCanvas.getContext('2d');
        const imageData = annotationCtx.getImageData(0, 0, annotationCanvas.width, annotationCanvas.height);
        const annotationData = new Uint8Array(imageData.data.buffer);

        try {
            const response = await fetch(`http://localhost:${serverPort}/save_annotations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    annotations: Array.from(annotationData),
                    width: annotationCanvas.width,
                    height: annotationCanvas.height
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            statusDiv.textContent = 'Annotations saved successfully!';
        } catch (error) {
            console.error('Error:', error);
            statusDiv.textContent = 'An error occurred while saving annotations.';
        }
    }

    vesselLabel.addEventListener('change', (e) => {
        const selectedVessel = vesselList.value;
        if (selectedVessel && annotations[selectedVessel]) {
            annotations[selectedVessel].label = e.target.value;
            updateVesselList();
        }
    });
</script>
