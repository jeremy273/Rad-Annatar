# Rad-Annatar

# Fluoroscopy Annotating Tool

## Project Overview
This project aims to build a Python-based backend for an AI-powered annotation tool designed to help with labeling segmented blood vessels from fluoroscopic images. This purpose of this tool is to help facilitate the creation a structured dataset that can be used to as training sets for more sophisticated AI tools for clinical applications. The goal is to create a tool and the data which are to be made available as open-source resources for the radiology community via RSNA's Data Resources.

### Key Features

- DICOM Image Handling & Anonymization: Utilizes pydicom to load, process, and anonymize DICOM images.

- Vessel Segmentation: Leverages a modified version of the TotalSegmentator, based on the nnU-Net architecture, to adapt from 3D to 2D fluoroscopic segmentation using contrast density and branching patterns.

- Metadata Extraction: Extract other dicom data (e.g., C-arm position, beam angle, Table X, Y, Z coordinates) to compare image pattern to position in space

- Region of Interest (ROI) Identification: Isolates individual anatomic structures for annotation by analyzing the pixel shading in the image and the morphologic features of vessels.

- Transfer Learning Integration: Continuously improves the model through a transfer learning approach that involves manual annotation, retraining, and iterative refinement.

- Design: Built on python for easy integration with existing tools.

## Project Significance

This tool addresses a critical gap in the field by providing:

1. An effective data annotating tool
4. A user-friendly interface to create and refine annotations.
5. A platform for improvement of the tool with more utilization.

## Technical Stack

- Backend: Python with Flask
- Frontend: HTML, CSS, JavaScript
- Image Processing: PyDicom, NumPy, SciPy, TotalSegmentator (nnU-Net architecture)

## Installation and Setup

Pending

## Usage

Pending

## Project Structure

Pending

## Roadmap

Roadmap

- Phase 1: Backend Development (Current Phase)
        DICOM loading and anonymization
        Vessel segmentation using TotalSegmentator
        ROI identification and metadata extraction (csv)

- Phase 2: Frontend Development (HELP NEEDED)
        Build a user-friendly web interface for file upload and user annotation.
        Implement interaction features like manual correction and speech-to-text for labeling.

- Phase 3: Model Refinement & Transfer Learning
        Implement and refine the transfer learning process using annotated datasets.
          - Better prediction of labeled ROI overtime
        Test the model's performance and continually improve accuracy
        Software and Hardware optimization

- Future Considerations:
        Scalability for large datasets (infrastructure)
        PACS integration
        3D Slicer integration for advanced visualization/compatibility

## Contributing

I welcome contributions to improve this project. Please follow these steps if you'd like to contribute:

- Fork the repository.
  
- Create a new branch for your feature (git checkout -b feature-branch).
  
- Commit your changes (git commit -m 'Add feature').
  
- Push to the branch (git push origin feature-branch).
  
- Open a pull request.

 -For major changes, please open an issue first to discuss what you'd like to modify.

## Acknowledgements

My backend relies on the amazing work from the individuals of TotalSegmentator. See their work here https://arxiv.org/abs/2208.05868

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact
If you would like to get in contact with me, please leave a comment and we can email
