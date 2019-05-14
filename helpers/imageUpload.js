import { CLOUDINARY_CLOUD_NAME } from "../config";
const unsignedUploadPreset = "ml_default";

// *********** Upload file to Cloudinary ******************** //
// https://codepen.io/team/Cloudinary/pen/QgpyOK
const uploadFile = file => {
  var url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  fd.append("upload_preset", unsignedUploadPreset);
  fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
  fd.append("file", file);
  xhr.send(fd);

  // https://gomakethings.com/promise-based-xhr/
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.readyState == 4 && xhr.status == 200) {
        // File uploaded successfully
        var response = JSON.parse(xhr.responseText);
        var url = response.secure_url;
        resolve({
          success: 1,
          file: {
            url
          }
        });
      } else {
        // If failed
        reject({
          success: 0,
          file: {
            url: ""
          }
        });
      }
    };
  });
};

export default uploadFile;
