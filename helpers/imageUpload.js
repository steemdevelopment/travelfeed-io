import { CLOUDINARY_CLOUD_NAME } from '../config';

const unsignedUploadPreset = 'ml_default';

// *********** Upload file to Cloudinary ******************** //
// https://codepen.io/team/Cloudinary/pen/QgpyOK
const uploadFile = (file, user) => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
  const xhr = new XMLHttpRequest();
  const fd = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  fd.append('upload_preset', unsignedUploadPreset);
  fd.append('tags', user); // Optional - add tag for image admin in Cloudinary
  fd.append('file', file);
  xhr.send(fd);

  // https://gomakethings.com/promise-based-xhr/
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.readyState == 4 && xhr.status == 200) {
        // File uploaded successfully
        const response = JSON.parse(xhr.responseText);
        const url = response.secure_url;
        resolve({
          success: 1,
          file: {
            url,
          },
        });
      } else {
        // If failed
        reject({
          success: 0,
          file: {
            url: '',
          },
        });
      }
    };
  });
};

export default uploadFile;
