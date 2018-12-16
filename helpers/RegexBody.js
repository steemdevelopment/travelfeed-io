import { getHtml } from "../components/busy/Body";

const RegexBody = body => {
  let getbody = body
    .replace(
      /(?:(?<=(?:src="))|(?:(?<=(?:\())))((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:(?=["|)]))/gi,
      "https://steemitimages.com/1000x0/$1"
    )
    .replace(
      /(?:(?<=[^"|^(|^s|^t]))((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:(?=[^"|^)]))/gi,
      '<img src="https://steemitimages.com/1000x0/$1"/>'
    )
    .replace(/^(https:\/\/steemitimages\.com\/0x0\/)/, "");
  let htmlBody = getHtml(getbody, {}, "text")
    .replace(/https:\/\/steemit.com/gi, "")
    .replace(/(href=)(?=(?:"http))/gi, 'rel="nofollow" href=')
    .replace(/(target="_blank" href=)(?=(?:"\/))/gi, "href=")
    .replace(
      /(?<=\s)(@(?:[a-zA-Z0-9]*))(?=\s|,|!|\?)/gi,
      '<a href="/$1">$1</a>'
    );
  return htmlBody;
};

export default RegexBody;
