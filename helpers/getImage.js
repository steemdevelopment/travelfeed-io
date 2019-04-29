//Gets the image from the json_metadata if they are defined, if not it crawls the body for an image, if none is found it returns a placeholder
import { imageRegex } from "../utils/regex";

export const getImageList = body => {
  body = body.replace(/(https:\/\/steemitimages\.com\/1000x0\/)/g, "");
  const image = body.match(imageRegex);
  return image;
};

export const imageProxy = (img_url, size) => {
  if (img_url === "") {
    return undefined;
  }
  // Get the cropped steemitimages URL for an image
  return `https://steemitimages.com/${size}/${img_url}`;
};

export const getImage = (img_url, body, size) => {
  let image = "";
  if (img_url !== "") {
    image = `https://steemitimages.com/${size}/` + img_url;
  } else {
    const imatch = body.match(imageRegex);
    if (imatch !== null) {
      image = `https://steemitimages.com/${size}/` + imatch[0];
    } else {
      image = `https://steemitimages.com/${size}/https://cdn.steemitimages.com/DQmPmEJ5NudyR5Vhh5X36U1qY8FgM5iuaN1Smc5N55cr363/default-header.png`;
    }
  }
  return image;
};
