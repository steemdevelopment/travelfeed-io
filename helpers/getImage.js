//Gets the image from the json_metadata if they are defined, if not it crawls the body for an image, if none is found it returns a placeholder
import { imageRegex } from "../utils/regex";
const bs58 = require("bs58");

export const getImageList = body => {
  body = body.replace(/(https:\/\/steemitimages\.com\/1000x0\/)/g, "");
  const image = body.match(imageRegex);
  return image;
};

export const imageProxy = (img_url, width, height, mode, format) => {
  if (img_url === "") {
    return undefined;
  }
  // Base58 encode image url
  // https://github.com/steemit/imagehoster
  const bytes = Buffer.from(img_url);
  const address = bs58.encode(bytes);
  // Use webp as format for best compression if supported
  // Get the cropped steemitimages URL for an image
  return `https://steemitimages.com/p/${address}/?format=${
    format ? format : "match"
  }${width ? `&width=${width}` : ""}${height ? `&height=${height}` : ""}${
    mode ? `&mode=${mode}` : ""
  }`;
};
