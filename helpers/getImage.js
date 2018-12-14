//Gets the image from the json_metadata if they are defined, if not it crawls the body for an image, if none is found it returns a placeholder
import { getHtml } from "../components/busy/Body";

const getImage = (json_metadata, body, size) => {
  const json = JSON.parse(json_metadata);
  let image = "";
  let htmlBody = getHtml(body, {}, "text");
  htmlBody = htmlBody
    .replace(
      /(?:[^"])((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:[^"])/,
      '<img src="$1"><'.replace(
        /((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:(?="))/g,
        `https://steemitimages.com/${size}/$1`
      )
    )
    .replace(/<a/g, '<a rel="nofollow')
    .replace(/https:\/\/steemit.com/g, "");
  if (
    typeof json.image != "undefined" &&
    json.image.length > 0 &&
    json.image[0] !== ""
  ) {
    image = `https://steemitimages.com/${size}/` + json.image[0];
  } else {
    const imatch = htmlBody.match(
      /((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:(?="))/
    );
    if (imatch !== null) {
      image = `https://steemitimages.com/${size}/` + imatch[0];
    } else {
      image = `https://steemitimages.com/${size}/https://cdn.steemitimages.com/DQmPmEJ5NudyR5Vhh5X36U1qY8FgM5iuaN1Smc5N55cr363/default-header.png`;
    }
  }
  return image;
};

export default getImage;
