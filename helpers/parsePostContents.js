import parseBody from './parseBody';
import { imgFullSize } from './regex';

export const getImageList = body => {
  const imageList = [];
  let parsedBody = parseBody(body, { parseImages: false });
  let imgMatches = imgFullSize.exec(parsedBody);
  while (imgMatches != null) {
    imgMatches = imgFullSize.exec(parsedBody);
    if (imgMatches != null) {
      imageList.push(imgMatches[1]);
      parsedBody = parsedBody.replace(imgMatches[0], '');
    }
  }
  return imageList;
};
