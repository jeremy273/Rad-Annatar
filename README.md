# Rad-Annatar
Fluoroscopy Image Annotation Tool
# Fluoroscopic Image Annotation Tool

## Project Overview
This project aims to build a Python-based backend for an AI-powered annotation tool designed to help interventional radiologists label segmented blood vessels from fluoroscopic images. The goal is to create structured  datasets that can be used to train machine learning models for clinical applications. The long-term aim is to publish this tool and its datasets as open-source resources for the radiology community via RSNA's Data Resources.

### Key Features

DICOM Image Handling & Anonymization: Utilizes pydicom to load, process, and anonymize DICOM images in compliance with HIPAA standards.
Vessel Segmentation: Leverages a modified version of the TotalSegmentator, based on the nnU-Net architecture, to adapt from 3D to 2D fluoroscopic segmentation using contrast density and branching patterns.
Metadata Extraction: Extracts crucial metadata (e.g., C-arm position, beam angle, Table X, Y, Z coordinates) for tracking the image intensifier's position in 3D space relative to the patient.
Region of Interest (ROI) Identification: Isolates individual anatomical structures (vessels) for annotation by using pixel shading and vessel morphology features.
Transfer Learning Integration: Continuously improves the model through a transfer learning approach that involves manual annotation, retraining, and iterative refinement.
Modular Design: Python backend designed for easy integration with future front-end development in JavaScript/HTML and visualization tools like 3D Slicer.

## Project Significance

This tool addresses a critical gap in the field of interventional radiology by providing:

1. A data annotating tool to provide the first open-source dataset of annotated fluoroscopic images with the intention of contributing to Data Resources section https://pubs.rsna.org/journal/ai
2. A user-friendly interface for radiologists to create and refine annotations.
3. A platform for continuous improvement of vessel segmentation algorithms through expert input.

## Technical Stack

- Backend: Python with Flask
- Frontend: HTML, CSS, JavaScript
- Image Processing: PyDicom, NumPy, SciPy
- Machine Learning: Adapted TotalSegmentator (nnU-Net architecture)
- Database: SQLite (current), with plans for more robust solutions

## Installation and Setup

(Include steps for setting up the development environment, installing dependencies, and running the application locally)

## Usage

(Provide instructions on how to use the tool, including uploading DICOM files, performing segmentation, making annotations, and saving results)

## Project Structure
Fluoroscopic-Image-Annotation-Tool/
│
├── server/
│   ├── app.py                 # Main Flask application
│   ├── dicom_processing.py    # DICOM handling and processing functions
│   └── segmentation.py        # Vessel segmentation algorithms
│
├── static/
│   ├── css/
│   │   └── styles.css         # CSS for the frontend
│   └── js/
│       └── main.js            # JavaScript for the frontend
│
├── templates/
│   └── index.html             # Main HTML template
│
├── data/
│   ├── raw/                   # Directory for storing uploaded DICOM files
│   └── processed/             # Directory for storing processed images
│
├── models/
│   └── segmentation_model.pth # Trained segmentation model (if applicable)
│
├── utils/
│   ├── data_utils.py          # Utility functions for data handling
│   └── visualization.py       # Functions for image visualization
│
├── tests/                     # Directory for test files
│
├── requirements.txt           # Python dependencies
├── .gitignore
├── README.md
└── run.py                     # Script to run the application

## Roadmap

Roadmap

    Phase 1: Backend Development (Current Phase)
        DICOM loading and anonymization
        Vessel segmentation using TotalSegmentator
        ROI identification and metadata extraction

    Phase 2: Frontend Development (HELP NEEDED - currently getting errors)
        Build a user-friendly web interface for radiologists to annotate vessels.
        Implement interaction features like manual correction and speech-to-text for labeling.

    Phase 3: Model Refinement & Transfer Learning
        Implement and refine the transfer learning process using annotated datasets.
        Test the model's performance and continually improve accuracy.

    Future Considerations:
        Scalability enhancements for large datasets
        PACS integration for hospital deployments
        3D Slicer integration for advanced visualization

## Contributing

I welcome contributions to improve this project. Please follow these steps if you'd like to contribute:

    Fork the repository.
    Create a new branch for your feature (git checkout -b feature-branch).
    Commit your changes (git commit -m 'Add feature').
    Push to the branch (git push origin feature-branch).
    Open a pull request.

For major changes, please open an issue first to discuss what you'd like to modify.

## Acknowledgements
My backend relies on the amazing work from the individuals of TotalSegmentator. See their work here https://arxiv.org/abs/2208.05868

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact
If you would like to get in contact with me, please leave a comment and we can email
