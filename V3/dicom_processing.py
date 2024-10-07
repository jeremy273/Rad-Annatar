import os
import numpy as np
import pydicom
from skimage import filters, morphology
from scipy import signal

def process_dicom_series(directory_path):
    """Process a series of DICOM files from a directory."""
    dicom_files = load_dicom_series(directory_path)
    processed_series = []
    for dcm in dicom_files:
        processed_image, metadata = process_dicom_file(dcm)
        processed_series.append((processed_image, metadata))
    return processed_series

def load_dicom_series(directory_path):
    """Load all DICOM files from a directory and sort them by instance number."""
    dicom_files = []
    for filename in os.listdir(directory_path):
        if filename.endswith('.dcm'):
            file_path = os.path.join(directory_path, filename)
            dcm = pydicom.dcmread(file_path)
            dicom_files.append(dcm)
    
    # Sort by instance number
    dicom_files.sort(key=lambda x: x.InstanceNumber)
    return dicom_files

def process_dicom_file(dcm):
    """Process a single DICOM file: anonymize and extract metadata."""
    anonymized_dcm = anonymize_dicom(dcm)
    metadata = extract_metadata(anonymized_dcm)
    
    pixel_data = anonymized_dcm.pixel_array
    pixel_data = pixel_data.astype(float)
    pixel_data = (pixel_data - np.min(pixel_data)) / (np.max(pixel_data) - np.min(pixel_data))
    
    return pixel_data, metadata

def anonymize_dicom(dcm):
    """Anonymize a DICOM file."""
    tags_to_anonymize = [
        'PatientName', 'PatientID', 'PatientBirthDate', 'PatientSex',
        'PatientAge', 'PatientWeight', 'PatientAddress', 'InstitutionName',
        'PatientTelephoneNumbers', 'PatientTelecomInformation',
        'MedicalRecordLocator', 'OtherPatientIDs', 'OtherPatientNames'
    ]
    
    for tag in dcm.dir():
        if 'Patient' in tag or 'Institution' in tag or tag in tags_to_anonymize:
            if tag == 'PatientName':
                dcm.PatientName = "Anonymous"
            elif tag == 'PatientID':
                dcm.PatientID = pydicom.uid.generate_uid()
            else:
                if tag in dcm:
                    delattr(dcm, tag)
    
    return dcm

def extract_metadata(dcm):
    """Extract relevant metadata for 3D positioning."""
    metadata = {}
    position_tags = [
        'TableHeight', 'TableLongitudinalPosition', 'TableLateralPosition',
        'PositionerPrimaryAngle', 'PositionerSecondaryAngle',
        'DistanceSourceToPatient', 'DistanceSourceToDetector'
    ]
    
    for tag in position_tags:
        if hasattr(dcm, tag):
            metadata[tag] = getattr(dcm, tag)
    
    return metadata

def segmentation_pipeline(preprocessed_image):
    """Main segmentation pipeline."""
    # Perform segmentation
    segmented_image = segment_vessels_2d(preprocessed_image)
    
    # Identify and isolate vessels
    isolated_vessels = identify_and_isolate_vessels(segmented_image)
    
    return segmented_image, isolated_vessels

def segment_vessels_2d(image_2d):
    """
    Simple vessel segmentation using thresholding and morphological operations.
    This is a placeholder and should be replaced with a more sophisticated method in the future.
    """
    # Ensure image is in float format and normalized
    image_2d = image_2d.astype(float)
    image_2d = (image_2d - np.min(image_2d)) / (np.max(image_2d) - np.min(image_2d))
    
    # Apply Gaussian filter to reduce noise
    image_smooth = filters.gaussian(image_2d, sigma=2)
    
    # Apply threshold
    thresh = filters.threshold_otsu(image_smooth)
    binary = image_smooth > thresh
    
    # Apply some morphological operations to clean up the segmentation
    binary = morphology.remove_small_objects(binary, min_size=50)
    binary = morphology.remove_small_holes(binary, area_threshold=50)
    
    return binary

def identify_and_isolate_vessels(segmented_image):
    """Identify and isolate individual vessels from the segmented image."""
    # Label connected components
    labeled_image, num_features = morphology.label(segmented_image, return_num=True)
    
    isolated_vessels = {}
    for i in range(1, num_features + 1):
        vessel_mask = labeled_image == i
        vessel_id = f'vessel_{i}'
        isolated_vessels[vessel_id] = vessel_mask
    
    return isolated_vessels

def find_branch_points(skeleton):
    """Find branch points in the skeleton of a vessel."""
    # Create a convolution kernel
    kernel = np.array([[1,1,1],
                       [1,10,1],
                       [1,1,1]])
    # Convolve the image to detect branch points
    conv = signal.convolve2d(skeleton, kernel, mode='same')
    # Branch points are where the convolution result is > 13
    branch_points = conv > 13
    return branch_points
