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
