const replaceex = /[^\sa-zA-Z0-9(?)(')(`)(,)(\-)(’)(#)(!)(´)(:)(()())(\])([)]+/g;

export const regExcerpt = text => {
  return text
    .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
    .replace(replaceex, "")
    .substring(0, 250);
};

export const regTitle = title => {
  return title.replace(replaceex, "");
};

const nospecialchars = /[^a-zA-Z0-9]/g;
export const permlinkFromTitle = title => {
  return title.replace(nospecialchars, "-").toLowerCase();
};

const swmregex = /!\bsteemitworldmap\b\s((?:[-+]?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?)))\s\blat\b\s((?:[-+]?(?:180(?:\.0+)?|(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d+)?)))\s\blong\b/i;
export const extractSWM = bodyText => {
  return swmregex.exec(bodyText);
};
