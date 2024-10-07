# Rad-Annatar
Fluoroscopy Image Annotation Tool
# Fluoroscopic Image Annotation Tool

## Project Overview

This project aims to develop an AI-based annotation tool for radiologists to label segmented blood vessels in angiographic and fluoroscopic images for interventional radiology. The primary goal is to create a structured, labeled dataset that can be used to train machine learning models for various clinical applications in the future.

### Key Features

- DICOM file handling and HIPAA-compliant anonymization
- Automated vessel segmentation using adapted deep learning techniques from TotalSegmentator
- User-friendly interface for manual refinement of segmentations
- Annotation of individual vessels with anatomical labels
- Database for storing and retrieving annotations
- Integration capabilities with hospital PACS systems (planned)

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

(Outline the main components of the project, their purposes, and how they interact)

## Future Development

- Integration with hospital PACS systems
- Enhanced 3D visualization capabilities
- Improved machine learning models for segmentation
- Multi-user support and collaborative annotation features

## Contributing

(Include guidelines for how others can contribute to the project)

## References
I am relying my image segmentation from the amazing work from the individuals of TotalSegmentator. See their work here https://arxiv.org/abs/2208.05868

## License

MIT Lisence

## Contact

(Provide contact information or guidelines for reaching out with questions or feedback)
