import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadFile from '../../helpers/imageUpload';
import { getUser } from '../../helpers/token';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const FeaturedImageUpload = props => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: 'image/*',
    multiple: false,
  });

  const text =
    acceptedFiles && acceptedFiles.length > 0
      ? acceptedFiles.map(file => `Uploading ${file.path}...`)
      : "By default, the first image in your post is used. To choose a custom featured image, drag 'n' drop an image here, or click to select one!";

  acceptedFiles.map(file => {
    return uploadFile(file, getUser()).then(res => {
      props.setFeaturedImage(res);
    });
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject],
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>{text}</p>
      </div>
    </div>
  );
};

FeaturedImageUpload.propTypes = {
  setFeaturedImage: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default FeaturedImageUpload;
