/**
This function is extracted from the source code of busy.org and Condenser with 
some slight   adjustments to meet our needs. Refer to the main one in case of 
future problems:
 * https://github.com/busyorg/busy/blob/27dd2383806eda8daf46748cbbbb26739d08ced4/src/client/components/Story/Body.js
 *
 */
//

import sanitizeHtml from 'sanitize-html';
import { DefaultRenderer } from 'steem-content-renderer';
import { ROOTURL } from '../config';
import { imageProxy } from './getImage';
import sanitizeConfig from './PostParser/SanitizeConfig';
import {
  dtubeImageRegex,
  dtubeLinkRegex,
  htmlComment,
  imgFullSize,
  markdownComment,
  swmregex,
} from './regex';

const renderer = new DefaultRenderer({
  baseUrl: 'https://travelfeed.io/',
  breaks: true,
  skipSanitization: true, // performed by sanitize
  addNofollowToLinks: false, // performed by sanitize
  doNotShowImages: false,
  allowInsecureScriptTags: true,
  ipfsPrefix: '',
  assetsWidth: 1, // performed by sanitize
  assetsHeight: 1, // performed by sanitize
  imageProxyFn: url => url,
  usertagUrlFn: account => `/@${account}`,
  hashtagUrlFn: hashtag => `/favorites/${hashtag}`,
  isLinkSafeFn: () => true,
});

const parseBody = (body, options) => {
  // Remove HTML comments
  let parsedBody = body.replace(htmlComment, '');
  // remove markdown comment
  parsedBody = parsedBody.replace(markdownComment, '');
  // Remove partiko ads
  parsedBody = parsedBody.replace(/Posted using \[Partiko .*]\(.*\)/g, '');
  // Remove travelfeed ads
  parsedBody = parsedBody.replace(
    /<hr \/><center>View this post <a href="https:\/\/travelfeed\.io\/@.*">on the TravelFeed dApp<\/a> for the best experience\.<\/center>/g,
    '',
  );
  // Remove dclick ads
  parsedBody = parsedBody.replace(/\[!\[dclick-imagead]\(h.*\)]\(.*\)/g, '');
  parsedBody = parsedBody.replace(
    /#####.*<sub>.*\*\*Sponsored \( Powered by \[dclick]\(https:\/\/www\.dclick\.io\) \)\*\* <\/sub>/g,
    '',
  );
  // Remove tripsteem ads
  parsedBody = parsedBody.replace(
    /<a href='https:\/\/.*tripsteem\.com\/post\/.*'>.*<\/a>/g,
    '',
  );
  parsedBody = parsedBody.replace(
    /This is posted on <a href='https:\/\/en\.tripsteem\.com\/'><b>trips\.teem/g,
    '',
  );
  parsedBody = parsedBody.replace(
    /<a href='https:\/\/en\.tripsteem\.com\/'>!\[image]\(https:\/\/cdn\.steemitimages\.com\/DQmUjAKXsageaSrVo4CgqvDGePsw7CbVFRfNv91fQrW9kuL\/banner_en\.jpg\)<\/a>/g,
    '',
  );
  // Remove SWM snippets with description
  parsedBody = parsedBody.replace(
    /!\bsteemitworldmap\b\s((?:[-+]?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?)))\s\blat\b\s((?:[-+]?(?:180(?:\.0+)?|(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d+)?)))\s\blong.*d3scr/gi,
    '',
  );
  // Remove preview images in dtube posts with dtube embeds
  const dtubeMatch = dtubeImageRegex.exec(parsedBody);
  if (dtubeMatch && dtubeMatch[1] && dtubeMatch[2])
    parsedBody = parsedBody.replace(
      dtubeImageRegex,
      `<iframe
      src="https://emb.d.tube/#!/${dtubeMatch[1]}/${dtubeMatch[2]}"
        height="300"
        scrolling="no"
        frameborder="0"
        allowtransparency="true"
        allowfullscreen
        style="width: 100%;"
      />`,
    );
  // Replace dtube links with dtube embeds
  parsedBody = parsedBody.replace(
    dtubeLinkRegex,
    `\n<iframe
  src="https://emb.d.tube/#!/$1"
    height="300"
    scrolling="no"
    frameborder="0"
    allowtransparency="true"
    allowfullscreen
    style="width: 100%;"
  />\n`,
  );
  // remove remaining SWM snippets
  parsedBody = parsedBody.replace(swmregex, '');
  // Replace Steemit links with Travelfeed
  parsedBody = parsedBody.replace(/https:\/\/steemit\.com/g, ROOTURL);
  parsedBody = parsedBody.replace(/https:\/\/busy\.org/g, ROOTURL);
  parsedBody = parsedBody.replace(/https:\/\/steempeak\.com/g, ROOTURL);
  // Render markdown to HTML
  try {
    parsedBody = parsedBody.length > 0 ? renderer.render(parsedBody) : '';
  } catch {
    // TODO: Content renderer needs an update to not throw an exception when script tags are used
    console.warn('Could not render post content');
  }
  // Sanitize
  parsedBody = sanitizeHtml(
    parsedBody,
    sanitizeConfig({
      secureLinks: options.secureLinks !== false,
    }),
  );

  // Proxify image urls and add lazyload and conditional webp
  if (options.parseImages !== false) {
    let imgMatches = imgFullSize.exec(parsedBody);
    while (imgMatches != null) {
      imgMatches = imgFullSize.exec(parsedBody);
      if (imgMatches != null) {
        if (options.lazy === false) {
          parsedBody = parsedBody.replace(
            imgMatches[0],
            `<figure><img ${
              imgMatches[2] && !options.hideimgcaptions
                ? `alt=${imgMatches[2]}`
                : ''
            } 
              src="${imageProxy(
                imgMatches[1],
                1800,
                undefined,
                'fit',
              )}"><figcaption>${
              imgMatches[2] === undefined ||
              // ignore alt texts with image name
              imgMatches[2].match(/(DSC_|\.gif|\.jpg|\.png)/i) ||
              options.hideimgcaptions
                ? ''
                : imgMatches[2]
            }</figcaption></figure>`,
          );
        } else {
          parsedBody = parsedBody.replace(
            imgMatches[0],
            `<figure><picture>
            <source type="image/webp"
                data-srcset="${imageProxy(
                  imgMatches[1],
                  options.cardWidth,
                  undefined,
                  undefined,
                  'webp',
                )}"
                data-sizes="100w">
            <img ${imgMatches[2] ? `alt="${imgMatches[2]}"` : ''} class="lazy"
                src="${imageProxy(
                  imgMatches[1],
                  undefined,
                  10,
                  'fit',
                )}" data-src="${imageProxy(
              imgMatches[1],
              options.cardWidth,
              undefined,
            )}"
            data-sizes="100w">
            </picture>
         <figcaption>${
           imgMatches[2] === undefined ||
           // ignore alt texts with image name
           imgMatches[2].match(/(DSC_|\.gif|\.jpeg|\.jpg|\.png)/i)
             ? ''
             : imgMatches[2]
         }</figcaption></figure>`,
          );
        }
      }
    }
  }
  return parsedBody;
};

export default parseBody;
