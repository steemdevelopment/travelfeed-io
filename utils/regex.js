export const imageRegex = /(https?:\/\/(?:[-a-zA-Z0-9._]*[-a-zA-Z0-9])(?::\d{2,5})?(?:[/?#](?:[^\s"'<>\][()]*[^\s"'<>\][().,])?(?:(?:\.(?:tiff?|jpe?g|gif|png|svg|ico)|ipfs\/[a-z\d]{40,}))))/gi;

export const ownUrl = /^(localhost|travelfeed\.io|travelfeedio\.herokuapp.com)$/;

export const allowedTitleChars = /[^\sa-zA-Z0-9(?)(')(/)(`)(,)(\-)(’)(#)(!)(´)(:)(()())(\])([)]+/g;

export const nospecialchars = /[^a-zA-Z0-9]/g;

export const swmregex = /!\bsteemitworldmap\b\s((?:[-+]?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?)))\s\blat\b\s((?:[-+]?(?:180(?:\.0+)?|(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d+)?)))\s\blong\b/i;

export const allURLs = /(?:https?|ftp):\/\/[\n\S]+/g;

export const htmlComment = /<!--([\s\S]+?)(-->|$)/g;

export const markdownComment = /\[\/\/\]:\S?\s\(.*\)/g;

export const regExcerpt = text => {
  return text
    .replace(allURLs, "")
    .replace(allowedTitleChars, "")
    .substring(0, 250);
};

export const regTitle = title => {
  return title.replace(allowedTitleChars, "");
};

export const permlinkFromTitle = title => {
  return title.replace(nospecialchars, "-").toLowerCase();
};

export const extractSWM = bodyText => {
  return swmregex.exec(bodyText);
};
