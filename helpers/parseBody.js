/**
This function is extracted from the source code of busy.org and Condenser with some slight-
 * adjustments to meet our needs. Refer to the main one in case of future problems:
 * https://github.com/busyorg/busy/blob/27dd2383806eda8daf46748cbbbb26739d08ced4/src/client/components/Story/Body.js
 *
 */
//

import sanitizeHtml from "sanitize-html";
import sanitizeConfig from "./PostParser/SanitizeConfig";
import htmlReady from "./PostParser/HtmlReady";
import improve from "./PostParser/improve";
import Remarkable from "remarkable";
import { imageRegex, htmlComment } from "../utils/regex";

// Initialise Markdown parser
const remarkable = new Remarkable({
  html: true, // Remarkable renders first then sanitize runs...
  breaks: true,
  linkify: false, // linkify is done locally
  typographer: false, // https://github.com/jonschlinkert/remarkable/issues/142#issuecomment-221546793
  quotes: "“”‘’"
});

const parseBody = body => {
  // Remove HTML comments
  let parsedBody = body.replace(htmlComment, "");
  // Proxify Image urls
  parsedBody = parsedBody.replace(
    imageRegex,
    "https://steemitimages.com/1000x0/$1"
  );
  // Latex
  parsedBody = improve(parsedBody);
  // Render markdown to HTML
  parsedBody = remarkable.render(parsedBody);
  // Todo: Implement Condenser/Busy HTML parsing
  const htmlReadyOptions = { mutate: true, resolveIframe: true };
  parsedBody = htmlReady(parsedBody, htmlReadyOptions).html;
  // Todo: Embeds
  // Sanitize
  parsedBody = sanitizeHtml(
    parsedBody,
    sanitizeConfig({
      secureLinks: true
    })
  );
  return parsedBody;
};

export default parseBody;
