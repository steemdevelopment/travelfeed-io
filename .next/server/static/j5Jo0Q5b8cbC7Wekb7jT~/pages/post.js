module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 59);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Grid");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("sanitize-html");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("dsteem");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("embedjs");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Card");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardContent");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/IconButton");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var author_blacklist = ["partiko", "steem-ua", "ocdb", "steemitboard", "drotto", "treeplanter", "coolbot", "microbot", "cabbage-dealer", "entrust", "sharkbank", "sleepagent", "kakibukit", "ssg-community", "esteemapp", "steem-plus", "minnowsupport", "snackplus", "pixresteemer"];
var permlink_blacklist = [];

var isBlacklisted = function isBlacklisted(author, permlink) {
  if (author_blacklist.indexOf(author) > -1 === true || permlink_blacklist.indexOf(permlink) > -1 === true) {
    return true;
  }

  return false;
};

/* harmony default export */ __webpack_exports__["a"] = (isBlacklisted);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("lodash/slice");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("xmldom");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/FlightTakeoff");

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//Gets the image from the json_metadata if they are defined, if not it crawls the body for an image, if none is found it returns a placeholder
var getImage = function getImage(json_metadata, body, size) {
  var json = JSON.parse(json_metadata);
  var image = "";

  if (typeof json.image != "undefined" && json.image.length > 0 && json.image[0] !== "") {
    image = "https://steemitimages.com/".concat(size, "/") + json.image[0];
  } else {
    var imatch = body.match(/(?:(?<=(?:src="|src='))|(?:(?<=(?:\(|>))))((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:(?=["|)|<]))/i);

    if (imatch !== null) {
      image = "https://steemitimages.com/".concat(size, "/") + imatch[0];
    } else {
      image = "https://steemitimages.com/".concat(size, "/https://cdn.steemitimages.com/DQmPmEJ5NudyR5Vhh5X36U1qY8FgM5iuaN1Smc5N55cr363/default-header.png");
    }
  }

  return image;
};

/* harmony default export */ __webpack_exports__["a"] = (getImage);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Returns a Date object if the input is a valid datetime string in JSON format (if not:returns input)
var dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

var reviver = function reviver(key, value) {
  if (typeof value === "string" && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
};

/* harmony default export */ __webpack_exports__["a"] = (reviver);

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Avatar");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardHeader");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("remarkable");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("url-parse");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("reading-time");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CircularProgress");

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-dom/server"
var server_ = __webpack_require__(24);
var server_default = /*#__PURE__*/__webpack_require__.n(server_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(7);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(16);
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(25);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);

// EXTERNAL MODULE: external "sanitize-html"
var external_sanitize_html_ = __webpack_require__(6);
var external_sanitize_html_default = /*#__PURE__*/__webpack_require__.n(external_sanitize_html_);

// EXTERNAL MODULE: external "remarkable"
var external_remarkable_ = __webpack_require__(26);
var external_remarkable_default = /*#__PURE__*/__webpack_require__.n(external_remarkable_);

// EXTERNAL MODULE: external "embedjs"
var external_embedjs_ = __webpack_require__(9);
var external_embedjs_default = /*#__PURE__*/__webpack_require__.n(external_embedjs_);

// CONCATENATED MODULE: ./components/busy/formatter.js
function jsonParse(input) {
  try {
    return JSON.parse(input);
  } catch (e) {
    return null;
  }
}
var epochToUTC = function epochToUTC(epochTimestamp) {
  return new Date(0).setUTCSeconds(epochTimestamp);
};
// EXTERNAL MODULE: external "url-parse"
var external_url_parse_ = __webpack_require__(27);
var external_url_parse_default = /*#__PURE__*/__webpack_require__.n(external_url_parse_);

// CONCATENATED MODULE: ./components/busy/regexHelpers.js
var imageRegex = /https?:\/\/(?:[-a-zA-Z0-9._]*[-a-zA-Z0-9])(?::\d{2,5})?(?:[/?#](?:[^\s"'<>\][()]*[^\s"'<>\][().,])?(?:(?:\.(?:tiff?|jpe?g|gif|png|svg|ico)|ipfs\/[a-z\d]{40,})))/gi;
var dtubeImageRegex = /<a href="https:\/\/d.tube.#!\/v\/[^/"]+\/[^/"]+"><img src="[^"]+"\/><\/a>/g;
var usernameURLRegex = /@([^/]+)/;
var categoryRegex = /\/([^/]+)/;
var rewriteRegex = /"https?:\/\/(?:www)?steemit\.com(\/((([\w-]+\/)?@[\w.-]+\/[\w-]+)|(@[\w.-]+(\/(comments|followers|followed|reblogs|transfers|activity))?)|((trending|created|active|hot|promoted)(\/[\w-]+)?))?)?"/g;
var ownUrl = /^(localhost|busy\.org|staging\.busy\.org|busy-master-pr-\d+\.herokuapp.com)$/;
/* harmony default export */ var regexHelpers = (null);
// CONCATENATED MODULE: ./components/busy/constants.js
var knownDomains = ["localhost", "travelfeed.io", "busy.org", "steempeak.com", "steemit.com", "d.tube", "youtube.com"];
// CONCATENATED MODULE: ./components/busy/SanitizeConfig.js




/**
This function is extracted from steemit.com source code and does the same tasks with some slight-
 * adjustments to meet our needs. Refer to the main one in case of future problems:
 * https://raw.githubusercontent.com/steemit/steemit.com/354c08a10cf88e0828a70dbf7ed9082698aea20d/app/utils/SanitizeConfig.js
 *
 */

var iframeWhitelist = [{
  re: /^(https?:)?\/\/player.vimeo.com\/video\/.*/i,
  fn: function fn(src) {
    // <iframe src="https://player.vimeo.com/video/179213493" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    if (!src) return null;
    var m = src.match(/https:\/\/player\.vimeo\.com\/video\/([0-9]+)/);
    if (!m || m.length !== 2) return null;
    return "https://player.vimeo.com/video/".concat(m[1]);
  }
}, {
  re: /^(https?:)?\/\/www.youtube.com\/embed\/.*/i,
  fn: function fn(src) {
    return src.replace(/\?.+$/, "");
  } // strip query string (yt: autoplay=1,controls=0,showinfo=0, etc)

}, {
  re: /^(https?:)?\/\/w.soundcloud.com\/player\/.*/i,
  fn: function fn(src) {
    if (!src) return null; // <iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/257659076&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>

    var m = src.match(/url=(.+?)[&?]/);
    if (!m || m.length !== 2) return null;
    return "https://w.soundcloud.com/player/?url=".concat(m[1], "&auto_play=false&hide_related=false&show_comments=true") + "&show_user=true&show_reposts=false&visual=true";
  }
}, {
  re: /^(https?:)?\/\/(?:www\.)?(?:periscope.tv\/)(.*)?$/i,
  fn: function fn(src) {
    return src;
  } // handled by embedjs

}, {
  re: /^(https?:)?\/\/(?:www\.)?(?:(player.)?twitch.tv\/)(.*)?$/i,
  fn: function fn(src) {
    return src;
  } // handled by embedjs

}, {
  re: /^(https?:)?\/\/(?:www\.)?(?:bitchute\.com\/)(.*)?$/i,
  fn: function fn(src) {
    return src;
  } // handled by embedjs

}];
var noImageText = "(Image not shown due to low ratings)";
var allowedTags = "\n    div, iframe, del,\n    a, p, b, q, br, ul, li, ol, img, h1, h2, h3, h4, h5, h6, hr,\n    blockquote, pre, code, em, strong, center, table, thead, tbody, tr, th, td,\n    strike, sup, sub, details, summary\n".trim().split(/,\s*/); // Medium insert plugin uses: div, figure, figcaption, iframe

/* harmony default export */ var SanitizeConfig = (function (_ref) {
  var _ref$large = _ref.large,
      large = _ref$large === void 0 ? true : _ref$large,
      _ref$noImage = _ref.noImage,
      noImage = _ref$noImage === void 0 ? false : _ref$noImage,
      _ref$sanitizeErrors = _ref.sanitizeErrors,
      sanitizeErrors = _ref$sanitizeErrors === void 0 ? [] : _ref$sanitizeErrors,
      _ref$secureLinks = _ref.secureLinks,
      secureLinks = _ref$secureLinks === void 0 ? false : _ref$secureLinks;
  return {
    allowedTags: allowedTags,
    // figure, figcaption,
    // SEE https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
    allowedAttributes: {
      // "src" MUST pass a whitelist (below)
      iframe: ["src", "width", "height", "frameborder", "allowfullscreen", "webkitallowfullscreen", "mozallowfullscreen"],
      // class attribute is strictly whitelisted (below)
      div: ["class"],
      // style is subject to attack, filtering more below
      td: ["style"],
      img: ["src", "alt"],
      a: ["href", "rel", "target"]
    },
    allowedSchemes: external_sanitize_html_default.a.defaults.allowedSchemes.concat(["byteball", "bitcoin"]),
    transformTags: {
      iframe: function iframe(tagName, attribs) {
        var srcAtty = decodeURIComponent(attribs.src);

        for (var _i = 0; _i < iframeWhitelist.length; _i++) {
          var item = iframeWhitelist[_i];

          if (item.re.test(srcAtty)) {
            var src = typeof item.fn === "function" ? item.fn(srcAtty, item.re) : srcAtty;
            if (!src) break;
            return {
              tagName: "iframe",
              attribs: {
                frameborder: "0",
                allowfullscreen: "allowfullscreen",
                webkitallowfullscreen: "webkitallowfullscreen",
                // deprecated but required for vimeo : https://vimeo.com/forums/help/topic:278181
                mozallowfullscreen: "mozallowfullscreen",
                // deprecated but required for vimeo
                src: src,
                width: large ? "640" : "480",
                height: large ? "360" : "270"
              }
            };
          }
        }

        console.log('Blocked, did not match iframe "src" white list urls:', tagName, attribs);
        sanitizeErrors.push("Invalid iframe URL: ".concat(srcAtty));
        return {
          tagName: "div",
          text: "(Unsupported ".concat(srcAtty, ")")
        };
      },
      img: function img(tagName, attribs) {
        if (noImage) return {
          tagName: "div",
          text: noImageText
        }; // See https://github.com/punkave/sanitize-html/issues/117

        var src = attribs.src,
            alt = attribs.alt;

        if (!/^(https?:)?\/\//i.test(src)) {
          console.log("Blocked, image tag src does not appear to be a url", tagName, attribs);
          sanitizeErrors.push("An image in this post did not save properly.");
          return {
            tagName: "img",
            attribs: {
              src: "brokenimg.jpg"
            }
          };
        } // replace http:// with // to force https when needed


        src = src.replace(/^http:\/\//i, "//");
        var atts = {
          src: src
        };
        if (alt && alt !== "") atts.alt = alt;
        return {
          tagName: tagName,
          attribs: atts
        };
      },
      div: function div(tagName, attribs) {
        var attys = {};
        var classWhitelist = ["pull-right", "pull-left", "text-justify", "text-rtl", "text-center", "text-right", "videoWrapper"];
        var validClass = classWhitelist.find(function (e) {
          return attribs.class === e;
        });

        if (validClass) {
          attys.class = validClass;
        }

        return {
          tagName: tagName,
          attribs: attys
        };
      },
      td: function td(tagName, attribs) {
        var attys = {};

        if (attribs.style === "text-align:right") {
          attys.style = "text-align:right";
        }

        return {
          tagName: tagName,
          attribs: attys
        };
      },
      a: function a(tagName, attribs) {
        var href = attribs.href;
        if (!href) href = "#";
        href = href.trim();
        var attys = {};
        var url = new external_url_parse_default.a(href);
        var hostname = url.hostname || "localhost";

        if (["https", "http"].indexOf(url.protocol) || !hostname.match(ownUrl)) {
          attys.target = "_blank";
        }

        if (secureLinks && knownDomains.indexOf(hostname) === -1) {
          href = "/exit?url=".concat(encodeURIComponent(href));
        }

        attys.href = href;
        return {
          tagName: tagName,
          attribs: attys
        };
      }
    }
  };
});
// EXTERNAL MODULE: external "lodash/slice"
var slice_ = __webpack_require__(17);
var slice_default = /*#__PURE__*/__webpack_require__.n(slice_);

// EXTERNAL MODULE: external "xmldom"
var external_xmldom_ = __webpack_require__(18);
var external_xmldom_default = /*#__PURE__*/__webpack_require__.n(external_xmldom_);

// CONCATENATED MODULE: ./components/busy/steemitLinks.js
/**
 * This function is extracted from steemit.com source code and does the same tasks with some slight-
 * adjustments to meet our needs. Refer to the main one in case of future problems:
 * https://github.com/steemit/steemit.com/blob/4d4fe1f7da37d3dbb35bd0a131d9e5b44bad316d/app/utils/Links.js
 */
var urlChar = '[^\\s"<>\\]\\[\\(\\)]';
var urlCharEnd = urlChar.replace(/\]$/, ".,']"); // insert bad chars to end on

var imagePath = "(?:(?:\\.(?:tiff?|jpe?g|gif|png|svg|ico)|ipfs/[a-z\\d]{40,}))";
var domainPath = "(?:[-a-zA-Z0-9\\._]*[-a-zA-Z0-9])";
var urlChars = "(?:".concat(urlChar, "*").concat(urlCharEnd, ")?");

var urlSet = function urlSet() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$domain = _ref.domain,
      domain = _ref$domain === void 0 ? domainPath : _ref$domain,
      path = _ref.path;

  return (// urlChars is everything but html or markdown stop chars
    "https?://".concat(domain, "(?::\\d{2,5})?(?:[/\\?#]").concat(urlChars).concat(path ? path : "", ")").concat(path ? "" : "?")
  );
};
/**
    Unless your using a 'g' (glob) flag you can store and re-use your regular expression.  Use the cache below.  If your using a glob (for example: replace all), the regex object becomes stateful and continues where it left off when called with the same string so naturally the regexp object can't be cached for long.
*/


var any = function any() {
  var flags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "i";
  return new RegExp(urlSet(), flags);
};
var local = function local() {
  var flags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "i";
  return new RegExp(urlSet({
    domain: "(?:localhost|(?:.*\\.)?steemit.com|(?:.*\\.)?busy.org)"
  }), flags);
};
var remote = function remote() {
  var flags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "i";
  return new RegExp(urlSet({
    domain: "(?!localhost|(?:.*\\.)?steemit.com|(?:.*\\.)?busy.org)".concat(domainPath)
  }), flags);
};
var youTube = function youTube() {
  var flags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "i";
  return new RegExp(urlSet({
    domain: "(?:(?:.*.)?youtube.com|youtu.be)"
  }), flags);
};
var steemitLinks_image = function image() {
  var flags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "i";
  return new RegExp(urlSet({
    path: imagePath
  }), flags);
};
var imageFile = function imageFile() {
  var flags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "i";
  return new RegExp(imagePath, flags);
}; // export const nonImage = (flags = 'i') => new RegExp(urlSet({path: '!' + imageFile}), flags)
// export const markDownImageRegExp = (flags = 'i') => new RegExp('\!\[[\w\s]*\]\(([^\)]+)\)', flags);

/* harmony default export */ var steemitLinks = ({
  any: any(),
  local: local(),
  remote: remote(),
  image: steemitLinks_image(),
  imageFile: imageFile(),
  youTube: youTube(),
  youTubeId: /(?:(?:youtube.com\/watch\?v=)|(?:youtu.be\/)|(?:youtube.com\/embed\/))([A-Za-z0-9\_\-]+)/i,
  vimeoId: /(?:vimeo.com\/|player.vimeo.com\/video\/)([0-9]+)/,
  // simpleLink: new RegExp(`<a href="(.*)">(.*)<\/a>`, 'ig'),
  ipfsPrefix: /(https?:\/\/.*)?\/ipfs/i
}); // Original regex
// const urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
// About performance
// Using exec on the same regex object requires a new regex to be created and compile for each text (ex: post).  Instead replace can be used `body.replace(remoteRe, l => {` discarding the result for better performance`}).  Re-compiling is a chrome bottleneck but did not effect nodejs.
// CONCATENATED MODULE: ./components/busy/ChainValidation.js
/**
 * This function is extracted from steemit.com source code and does the same tasks with some slight-
 * adjustments to meet our needs. Refer to the main one in case of future problems:
 * https://github.com/steemit/steemit.com/blob/06c90aa8260f09c4ae061e652d884f68b8a6a409/app/utils/ChainValidation.js
 */
function validateAccountName(value) {
  var label;
  var suffix;
  suffix = "Account name should ";

  if (!value) {
    return "".concat(suffix, "not be empty.");
  }

  var length = value.length;

  if (length < 3) {
    return "".concat(suffix, "be longer.");
  }

  if (length > 16) {
    return "".concat(suffix, "be shorter.");
  }

  if (/\./.test(value)) {
    suffix = "Each account segment should ";
  }

  var ref = value.split(".");

  for (var i = 0, len = ref.length; i < len; i += 1) {
    label = ref[i];

    if (!/^[a-z]/.test(label)) {
      return "".concat(suffix, "start with a letter.");
    }

    if (!/^[a-z0-9-]*$/.test(label)) {
      return "".concat(suffix, "have only letters, digits, or dashes.");
    }

    if (/--/.test(label)) {
      return "".concat(suffix, "have only one dash in a row.");
    }

    if (!/[a-z0-9]$/.test(label)) {
      return "".concat(suffix, "end with a letter or digit.");
    }

    if (!(label.length >= 3)) {
      return "".concat(suffix, "be longer");
    }
  }

  return null;
}
/* harmony default export */ var ChainValidation = (null);
// CONCATENATED MODULE: ./components/busy/steemitHtmlReady.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This function is extracted from steemit.com source code and does the same tasks with some slight-
 * adjustments to meet our needs(Removed Embed and ipfs related code). Refer to the main one in case of future problems:
 * https://github.com/steemit/steemit.com/blob/2c2b89a6745aebec1fa45453f31362d700f1bfb7/shared/HtmlReady.js
 */





var getProxyImageURL = "https://steemitimages.com/1200x0/";

var noop = function noop() {};

var DOMParser = new external_xmldom_default.a.DOMParser({
  errorHandler: {
    warning: noop,
    error: noop
  }
});
var XMLSerializer = new external_xmldom_default.a.XMLSerializer();
/**
 * Functions performed by HTMLReady
 *
 * State reporting
 *  - hashtags: collect all #tags in content
 *  - usertags: collect all @mentions in content
 *  - htmltags: collect all html <tags> used (for validation)
 *  - images: collect all image URLs in content
 *  - links: collect all href URLs in content
 *
 * Mutations
 *  - link()
 *    - ensure all <a> href's begin with a protocol. prepend https:// otherwise.
 *  - iframe()
 *    - wrap all <iframe>s in <div class="videoWrapper"> for responsive sizing
 *  - img()
 *    - convert any <img> src IPFS prefixes to standard URL
 *    - change relative protocol to https://
 *  - linkifyNode()
 *    - scans text content to be turned into rich content
 *    - embedYouTubeNode()
 *      - identify plain youtube URLs and prep them for "rich embed"
 *    - linkify()
 *      - scan text for:
 *        - #tags, convert to <a> links
 *        - @mentions, convert to <a> links
 *        - naked URLs
 *          - if img URL, normalize URL and convert to <img> tag
 *          - otherwise, normalize URL and convert to <a> link
 *  - proxifyImages()
 *    - prepend proxy URL to any non-local <img> src's
 *
 * We could implement 2 levels of HTML mutation for maximum reuse:
 *  1. Normalization of HTML - non-proprietary, pre-rendering cleanup/normalization
 *    - (state reporting done at this level)
 *    - normalize URL protocols
 *    - convert naked URLs to images/links
 *    - convert embeddable URLs to <iframe>s
 *    - basic sanitization?
 *  2. Steemit.com Rendering - add in proprietary Steemit.com functions/links
 *    - convert <iframe>s to custom objects
 *    - linkify #tags and @mentions
 *    - proxify images
 *
 * TODO:
 *  - change url to normalizeUrl(url)
 *    - rewrite IPFS prefixes to valid URLs
 *    - schema normalization
 *    - gracefully handle protocols like ftp, mailto
 */

/** Split the HTML on top-level elements. This allows react to compare separately, preventing excessive re-rendering.
 * Used in MarkdownViewer.jsx
 */
// export function sectionHtml (html) {
//   const doc = DOMParser.parseFromString(html, 'text/html')
//   const sections = Array(...doc.childNodes).map(child => XMLSerializer.serializeToString(child))
//   return sections
// }

/** Embed videos, link mentions and hashtags, etc...
 */

/* harmony default export */ var steemitHtmlReady = (function (html) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$mutate = _ref.mutate,
      mutate = _ref$mutate === void 0 ? true : _ref$mutate,
      resolveIframe = _ref.resolveIframe;

  var state = {
    mutate: mutate,
    resolveIframe: resolveIframe
  };
  state.hashtags = new Set();
  state.usertags = new Set();
  state.htmltags = new Set();
  state.images = new Set();
  state.links = new Set();

  try {
    var doc = DOMParser.parseFromString(html, "text/html");
    traverse(doc, state);
    if (mutate) proxifyImages(doc); // console.log('state', state)

    if (!mutate) return state;
    return _objectSpread({
      html: doc ? XMLSerializer.serializeToString(doc) : ""
    }, state);
  } catch (error) {
    // Not Used, parseFromString might throw an error in the future
    console.error(error.toString());
    return {
      html: html
    };
  }
});

function traverse(node, state) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!node || !node.childNodes) return;
  Array.apply(void 0, _toConsumableArray(node.childNodes)).forEach(function (child) {
    // console.log(depth, 'child.tag,data', child.tagName, child.data)
    var tag = child.tagName ? child.tagName.toLowerCase() : null;
    if (tag) state.htmltags.add(tag);
    if (tag === "img") steemitHtmlReady_img(state, child);else if (tag === "iframe") iframe(state, child);else if (tag === "a") steemitHtmlReady_link(state, child);else if (child.nodeName === "#text") linkifyNode(child, state);
    traverse(child, state, depth + 1);
  });
}

function steemitHtmlReady_link(state, child) {
  var url = child.getAttribute("href");

  if (url) {
    state.links.add(url);

    if (state.mutate) {
      // If this link is not relative, http, or https -- add https.
      if (!/^[\w.-]+:(\/\/)?/.test(url)) {
        child.setAttribute("href", "https://".concat(url));
      }
    }
  }
} // wrap iframes in div.videoWrapper to control size/aspect ratio


function iframe(state, child) {
  var url = child.getAttribute("src");
  var domString;
  var embed = external_embedjs_default.a.get(url || "", {
    width: "100%",
    height: 400
  });

  if (embed && embed.id) {
    var images = state.images,
        links = state.links;
    links.add(embed.url);
    images.add("https://img.youtube.com/vi/".concat(embed.id, "/0.jpg"));
    if (!resolveIframe) domString = "~~~ embed:".concat(embed.id, " ").concat(embed.provider_name, " ").concat(embed.url, " ~~~");
  }

  var mutate = state.mutate,
      resolveIframe = state.resolveIframe;
  if (!mutate) return;
  var tag = child.parentNode.tagName ? child.parentNode.tagName.toLowerCase() : child.parentNode.tagName;
  if (tag === "div" && child.parentNode.getAttribute("class") === "videoWrapper") return;
  var html = XMLSerializer.serializeToString(child);
  if (resolveIframe) domString = "<div class=\"videoWrapper\">".concat(html, "</div>");
  child.parentNode.replaceChild(DOMParser.parseFromString(domString), child);
}

function steemitHtmlReady_img(state, child) {
  var url = child.getAttribute("src");

  if (url) {
    state.images.add(url);

    if (state.mutate) {
      var url2 = url;

      if (/^\/\//.test(url2)) {
        // Change relative protocol imgs to https
        url2 = "https:".concat(url2);
      }

      if (url2 !== url) {
        child.setAttribute("src", url2);
      }
    }
  }
} // For all img elements with non-local URLs, prepend the proxy URL (e.g. `https://img0.steemit.com/0x0/`)


function proxifyImages(doc) {
  if (!doc) return;

  _toConsumableArray(doc.getElementsByTagName("img")).forEach(function (node) {
    var url = node.getAttribute("src");

    if (!steemitLinks.local.test(url)) {
      node.setAttribute("src", {
        getProxyImageURL: getProxyImageURL
      });
    }
  });
}

function linkifyNode(child, state) {
  try {
    var tag = child.parentNode.tagName ? child.parentNode.tagName.toLowerCase() : child.parentNode.tagName;
    if (tag === "code") return;
    if (tag === "a") return;
    var mutate = state.mutate;
    if (!child.data) return;
    if (isEmbedable(child, state.links, state.images, state.resolveIframe)) return;
    var data = XMLSerializer.serializeToString(child);
    var content = linkify(data, state.mutate, state.hashtags, state.usertags, state.images, state.links);

    if (mutate && content !== data) {
      var newChild = DOMParser.parseFromString("<span>".concat(content, "</span>"));
      child.parentNode.replaceChild(newChild, child);
      return newChild;
    }
  } catch (error) {
    console.log(error);
  }
}

function linkify(content, mutate, hashtags, usertags, images, links) {
  // hashtag
  content = content.replace(/(^|\s)(#[-a-z\d]+)/gi, function (tag) {
    if (/#[\d]+$/.test(tag)) return tag; // Don't allow numbers to be tags

    var space = /^\s/.test(tag) ? tag[0] : "";
    var tag2 = tag.trim().substring(1);
    var tagLower = tag2.toLowerCase();
    if (hashtags) hashtags.add(tagLower);
    if (!mutate) return tag;
    return "".concat(space, "<a href=\"/trending/").concat(tagLower, "\">").concat(tag, "</a>");
  }); // usertag (mention)
  // Cribbed from https://github.com/twitter/twitter-text/blob/v1.14.7/js/twitter-text.js#L90
  // https://github.com/steemit/condenser/blob/7c588536d2568a554391ea1edaa656c636c5a890/src/shared/HtmlReady.js#L272-L290

  content = content.replace(/(^|[^a-zA-Z0-9_!#$%&*@＠\/]|(^|[^a-zA-Z0-9_+~.-\/#]))[@＠]([a-z][-\.a-z\d]+[a-z\d])/gi, function (match, preceeding1, preceeding2, user) {
    var userLower = user.toLowerCase();
    var valid = validateAccountName(userLower) == null;
    if (valid && usertags) usertags.add(userLower);
    var preceedings = (preceeding1 || "") + (preceeding2 || ""); // include the preceeding matches if they exist

    if (!mutate) return "".concat(preceedings).concat(user);
    return valid ? "".concat(preceedings, "<a href=\"/@").concat(userLower, "\">@").concat(user, "</a>") : "".concat(preceedings, "@").concat(user);
  });
  content = content.replace(steemitLinks.any, function (ln) {
    if (steemitLinks.image.test(ln)) {
      if (images) images.add(ln);
      return "<img src=\"".concat(ln, "\" />");
    } // do not linkify .exe or .zip urls


    if (/\.(zip|exe)$/i.test(ln)) return ln;
    if (links) links.add(ln);
    return "<a href=\"".concat(ln, "\">").concat(ln, "</a>");
  });
  return content;
}

function isEmbedable(child, links, images, resolveIframe) {
  try {
    if (!child.data) return false;
    var data = child.data;
    var foundLinks = data.match(steemitLinks.any);
    if (!foundLinks) return false;
    var embed = external_embedjs_default.a.get(foundLinks[0] || "", {
      width: "100%",
      height: 400
    });

    if (embed && embed.id) {
      var domString = resolveIframe ? embed.embed : "".concat(slice_default()(data, 0, foundLinks.index), "~~~ embed:").concat(embed.id, " ").concat(embed.provider_name, " ").concat(embed.url, " ~~~").concat(slice_default()(data, foundLinks.index + foundLinks[0].length, data.length));
      var v = DOMParser.parseFromString(domString);
      child.parentNode.replaceChild(v, child); // console.trace('embed.embed', v);

      if (links) links.add(embed.url);
      if (images) images.add("https://img.youtube.com/vi/".concat(embed.id, "/0.jpg"));
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
/** @return {id, url} or <b>null</b> */


function youTubeId(data) {
  if (!data) return null;
  var m1 = data.match(steemitLinks.youTube);
  var url = m1 ? m1[0] : null;
  if (!url) return null;
  var m2 = url.match(steemitLinks.youTubeId);
  var id = m2 && m2.length >= 2 ? m2[1] : null;
  if (!id) return null;
  return {
    id: id,
    url: url
  };
}
// CONCATENATED MODULE: ./components/busy/improve.js
var latexRegex = /\[\+\]((\n|.)*?)\[\+\]/g;
function improve(body) {
  return body.replace(latexRegex, function (match, p1) {
    return "![".concat(p1, "](https://latex.codecogs.com/gif.latex?").concat(encodeURI(p1), ")");
  });
}
// CONCATENATED MODULE: ./components/busy/PostFeedEmbed.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function PostFeedEmbed_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var PostFeedEmbed_PostFeedEmbed =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PostFeedEmbed, _React$Component);

  function PostFeedEmbed(props) {
    var _this;

    _classCallCheck(this, PostFeedEmbed);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostFeedEmbed).call(this, props));

    PostFeedEmbed_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleThumbClick", function (e) {
      e.preventDefault();

      _this.setState({
        showIframe: true
      });
    });

    PostFeedEmbed_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderWithIframe", function (embed) {
      return (// eslint-disable-next-line react/no-danger
        external_react_default.a.createElement("div", {
          className: "PostFeedEmbed__container",
          dangerouslySetInnerHTML: {
            __html: embed
          }
        })
      );
    });

    _this.state = {
      showIframe: false
    };
    return _this;
  }

  _createClass(PostFeedEmbed, [{
    key: "renderThumbFirst",
    value: function renderThumbFirst(thumb) {
      return external_react_default.a.createElement("div", {
        role: "presentation",
        className: "PostFeedEmbed",
        onClick: this.handleThumbClick
      }, external_react_default.a.createElement("div", {
        className: "PostFeedEmbed__playButton"
      }, external_react_default.a.createElement("i", {
        className: "iconfont icon-group icon-playon_fill"
      })), external_react_default.a.createElement("img", {
        alt: "thumbnail",
        className: "PostFeedEmbed__preview",
        src: thumb
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          embed = _this$props.embed,
          inPost = _this$props.inPost;
      var shouldRenderThumb = inPost ? false : !this.state.showIframe;

      if ((embed.provider_name === "YouTube" || embed.provider_name === "DTube") && shouldRenderThumb) {
        return this.renderThumbFirst(embed.thumbnail);
      } else if (embed.embed) {
        return this.renderWithIframe(embed.embed);
      }

      return external_react_default.a.createElement("div", null);
    }
  }]);

  return PostFeedEmbed;
}(external_react_default.a.Component);

PostFeedEmbed_defineProperty(PostFeedEmbed_PostFeedEmbed, "defaultProps", {
  inPost: false
});


// CONCATENATED MODULE: ./components/busy/Body.js
/* unused harmony export remarkable */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getHtml; });














var remarkable = new external_remarkable_default.a({
  html: true,
  // Remarkable renders first then sanitize runs...
  breaks: true,
  linkify: false,
  // linkify is done locally
  typographer: false,
  // https://github.com/jonschlinkert/remarkable/issues/142#issuecomment-221546793
  quotes: "“”‘’"
});

var Body_getEmbed = function getEmbed(link) {
  var embed = external_embedjs_default.a.get(link, {
    width: "100%",
    height: 400,
    autoplay: false
  });

  if (external_lodash_default.a.isUndefined(embed)) {
    return {
      provider_name: "",
      thumbnail: "",
      embed: link
    };
  }

  return embed;
}; // Should return text(html) if returnType is text
// Should return Object(React Compatible) if returnType is Object


function getHtml(body) {
  var jsonMetadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var returnType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Object";
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var parsedJsonMetadata = jsonParse(jsonMetadata) || {};
  parsedJsonMetadata.image = parsedJsonMetadata.image || [];
  var parsedBody = body.replace(/<!--([\s\S]+?)(-->|$)/g, "(html comment removed: $1)");
  parsedBody.replace(imageRegex, function (img) {
    if (external_lodash_default.a.filter(parsedJsonMetadata.image, function (i) {
      return i.indexOf(img) !== -1;
    }).length === 0) {
      parsedJsonMetadata.image.push(img);
    }
  });
  parsedBody = improve(parsedBody);
  parsedBody = remarkable.render(parsedBody);
  var htmlReadyOptions = {
    mutate: true,
    resolveIframe: returnType === "text"
  };
  parsedBody = steemitHtmlReady(parsedBody, htmlReadyOptions).html;
  parsedBody = parsedBody.replace(dtubeImageRegex, "");

  if (options.rewriteLinks) {
    parsedBody = parsedBody.replace(rewriteRegex, function (match, p1) {
      return "\"".concat(p1 || "/", "\"");
    });
  }

  parsedBody = external_sanitize_html_default()(parsedBody, SanitizeConfig({
    secureLinks: options.secureLinks
  }));

  if (returnType === "text") {
    return parsedBody;
  }

  var sections = [];
  var splittedBody = parsedBody.split("~~~ embed:");

  for (var i = 0; i < splittedBody.length; i += 1) {
    var section = splittedBody[i];
    var match = section.match(/^([A-Za-z0-9_-]+) ([A-Za-z]+) (\S+) ~~~/);

    if (match && match.length >= 4) {
      var id = match[1];
      var type = match[2];
      var link = match[3];
      var embed = Body_getEmbed(link);
      sections.push(server_default.a.renderToString(external_react_default.a.createElement(PostFeedEmbed_PostFeedEmbed, {
        key: "embed-a-".concat(i),
        inPost: true,
        embed: embed
      })));
      section = section.substring("".concat(id, " ").concat(type, " ").concat(link, " ~~~").length);
    }

    if (section !== "") {
      sections.push(section);
    }
  } // eslint-disable-next-line react/no-danger


  return external_react_default.a.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: sections.join("")
    }
  });
}

var Body_Body = function Body(props) {
  var options = {
    rewriteLinks: props.rewriteLinks,
    secureLinks: props.exitPageSetting
  };
  var htmlSections = getHtml(props.body, props.jsonMetadata, "Object", options);
  return external_react_default.a.createElement("div", {
    className: external_classnames_default()("Body", {
      "Body--full": props.full
    })
  }, htmlSections);
};

Body_Body.defaultProps = {
  body: "",
  jsonMetadata: "",
  full: false,
  rewriteLinks: false,
  exitPageSetting: true
};
/* harmony default export */ var busy_Body = (Body_Body);

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/MoreVert");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/BookmarkBorder");

/***/ }),
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(65);


/***/ }),
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "@babel/runtime/regenerator"
var regenerator_ = __webpack_require__(3);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "@babel/polyfill"
var polyfill_ = __webpack_require__(14);

// EXTERNAL MODULE: external "react-helmet"
var external_react_helmet_ = __webpack_require__(10);
var external_react_helmet_default = /*#__PURE__*/__webpack_require__.n(external_react_helmet_);

// EXTERNAL MODULE: ./helpers/getImage.js
var getImage = __webpack_require__(20);

// EXTERNAL MODULE: ./helpers/isBlacklisted.js
var isBlacklisted = __webpack_require__(15);

// EXTERNAL MODULE: external "dsteem"
var external_dsteem_ = __webpack_require__(8);

// EXTERNAL MODULE: external "@material-ui/core/Button"
var Button_ = __webpack_require__(5);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(7);

// EXTERNAL MODULE: external "next/link"
var link_ = __webpack_require__(1);
var link_default = /*#__PURE__*/__webpack_require__.n(link_);

// EXTERNAL MODULE: external "@material-ui/core/Typography"
var Typography_ = __webpack_require__(2);
var Typography_default = /*#__PURE__*/__webpack_require__.n(Typography_);

// CONCATENATED MODULE: ./components/PostAuthorProfile.js


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var client = new external_dsteem_["Client"]("https://api.steemit.com");



var PostAuthorProfile_PostAuthorProfile =
/*#__PURE__*/
function (_Component) {
  _inherits(PostAuthorProfile, _Component);

  function PostAuthorProfile() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PostAuthorProfile);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PostAuthorProfile)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      author: _this.props.author,
      profiledesc: "A TravelFeed author."
    });

    return _this;
  }

  _createClass(PostAuthorProfile, [{
    key: "getProfile",
    value: function () {
      var _getProfile = _asyncToGenerator(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee() {
        var acc, json, profiledesc;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return client.database.getAccounts([this.state.author]);

              case 2:
                acc = _context.sent;

                if (acc[0].json_metadata != "") {
                  json = JSON.parse(acc[0].json_metadata);
                  profiledesc = json.profile.about != "" ? json.profile.about : this.state.profiledesc;
                  this.setState({
                    profiledesc: profiledesc
                  });
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getProfile() {
        return _getProfile.apply(this, arguments);
      }

      return getProfile;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getProfile();
    }
  }, {
    key: "render",
    value: function render() {
      return external_react_default.a.createElement("div", {
        className: "text-center"
      }, external_react_default.a.createElement(Typography_default.a, {
        variant: "h5",
        className: "p-2"
      }, "Written by:"), external_react_default.a.createElement(link_default.a, {
        as: "/@".concat(this.props.author),
        href: "/blog?author=".concat(this.props.author),
        passHref: true
      }, external_react_default.a.createElement("a", null, external_react_default.a.createElement("div", {
        className: "pb-2"
      }, external_react_default.a.createElement("img", {
        style: {
          cursor: "pointer"
        },
        src: "https://steemitimages.com/u/".concat(this.props.author, "/avatar"),
        width: "80",
        height: "80",
        className: "rounded-circle"
      })))), external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("div", null, external_react_default.a.createElement(link_default.a, {
        as: "/@".concat(this.props.author),
        href: "/blog?author=".concat(this.props.author),
        passHref: true
      }, external_react_default.a.createElement("a", null, external_react_default.a.createElement(Typography_default.a, {
        variant: "title",
        className: "text-dark cpointer"
      }, this.props.author)))), external_react_default.a.createElement("p", {
        className: "p-2"
      }, this.state.profiledesc)), external_react_default.a.createElement("div", null, external_react_default.a.createElement(Button_default.a, {
        variant: "outlined",
        size: "small",
        color: "primary"
      }, "Follow")));
    }
  }]);

  return PostAuthorProfile;
}(external_react_["Component"]);

/* harmony default export */ var components_PostAuthorProfile = (PostAuthorProfile_PostAuthorProfile);
// EXTERNAL MODULE: ./helpers/dateFromJsonString.js
var dateFromJsonString = __webpack_require__(21);

// EXTERNAL MODULE: external "@material-ui/core/Card"
var Card_ = __webpack_require__(11);
var Card_default = /*#__PURE__*/__webpack_require__.n(Card_);

// EXTERNAL MODULE: external "@material-ui/core/CardContent"
var CardContent_ = __webpack_require__(12);
var CardContent_default = /*#__PURE__*/__webpack_require__.n(CardContent_);

// EXTERNAL MODULE: ./components/busy/Body.js + 9 modules
var Body = __webpack_require__(30);

// CONCATENATED MODULE: ./helpers/RegexBody.js


var RegexBody_RegexBody = function RegexBody(body) {
  var getbody = body.replace(/(?:(?<=(?:src="))|(?:(?<=(?:\())))((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:(?=["|)]))/gi, "https://steemitimages.com/1000x0/$1").replace(/(?:(?<=[^"|^(|^s|^t]))((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:(?=[^"|^)]))/gi, '<img src="https://steemitimages.com/1000x0/$1"/>').replace(/^(https:\/\/steemitimages\.com\/0x0\/)/, "");
  var htmlBody = Object(Body["a" /* getHtml */])(getbody, {}, "text").replace(/https:\/\/steemit.com/gi, "").replace(/(href=)(?=(?:"http))/gi, 'rel="nofollow" href=').replace(/(target="_blank" href=)(?=(?:"\/))/gi, "href=").replace(/(?<=\s)(@(?:[a-zA-Z0-9]*))(?=\s|,|!|\?)/gi, '<a href="/$1">$1</a>');
  return htmlBody;
};

/* harmony default export */ var helpers_RegexBody = (RegexBody_RegexBody);
// EXTERNAL MODULE: external "@material-ui/core/Grid"
var Grid_ = __webpack_require__(4);
var Grid_default = /*#__PURE__*/__webpack_require__.n(Grid_);

// EXTERNAL MODULE: external "@material-ui/core/CircularProgress"
var CircularProgress_ = __webpack_require__(29);
var CircularProgress_default = /*#__PURE__*/__webpack_require__.n(CircularProgress_);

// EXTERNAL MODULE: external "@material-ui/core/IconButton"
var IconButton_ = __webpack_require__(13);
var IconButton_default = /*#__PURE__*/__webpack_require__.n(IconButton_);

// EXTERNAL MODULE: external "@material-ui/core/Avatar"
var Avatar_ = __webpack_require__(22);
var Avatar_default = /*#__PURE__*/__webpack_require__.n(Avatar_);

// EXTERNAL MODULE: external "@material-ui/core/CardHeader"
var CardHeader_ = __webpack_require__(23);
var CardHeader_default = /*#__PURE__*/__webpack_require__.n(CardHeader_);

// EXTERNAL MODULE: external "@material-ui/icons/MoreVert"
var MoreVert_ = __webpack_require__(52);
var MoreVert_default = /*#__PURE__*/__webpack_require__.n(MoreVert_);

// CONCATENATED MODULE: ./components/PostComments.js


function PostComments_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { PostComments_typeof = function _typeof(obj) { return typeof obj; }; } else { PostComments_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return PostComments_typeof(obj); }

function PostComments_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function PostComments_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { PostComments_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { PostComments_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function PostComments_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function PostComments_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function PostComments_createClass(Constructor, protoProps, staticProps) { if (protoProps) PostComments_defineProperties(Constructor.prototype, protoProps); if (staticProps) PostComments_defineProperties(Constructor, staticProps); return Constructor; }

function PostComments_possibleConstructorReturn(self, call) { if (call && (PostComments_typeof(call) === "object" || typeof call === "function")) { return call; } return PostComments_assertThisInitialized(self); }

function PostComments_getPrototypeOf(o) { PostComments_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return PostComments_getPrototypeOf(o); }

function PostComments_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) PostComments_setPrototypeOf(subClass, superClass); }

function PostComments_setPrototypeOf(o, p) { PostComments_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return PostComments_setPrototypeOf(o, p); }

function PostComments_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function PostComments_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



















var PostComments_client = new external_dsteem_["Client"]("https://api.steemit.com");

var PostComments_PostComments =
/*#__PURE__*/
function (_Component) {
  PostComments_inherits(PostComments, _Component);

  function PostComments() {
    var _getPrototypeOf2;

    var _this;

    PostComments_classCallCheck(this, PostComments);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = PostComments_possibleConstructorReturn(this, (_getPrototypeOf2 = PostComments_getPrototypeOf(PostComments)).call.apply(_getPrototypeOf2, [this].concat(args)));

    PostComments_defineProperty(PostComments_assertThisInitialized(PostComments_assertThisInitialized(_this)), "state", {
      author: _this.props.author,
      permlink: _this.props.permlink,
      error: false,
      hasMore: true,
      isLoading: false,
      stream: []
    });

    PostComments_defineProperty(PostComments_assertThisInitialized(PostComments_assertThisInitialized(_this)), "streamComments",
    /*#__PURE__*/
    PostComments_asyncToGenerator(
    /*#__PURE__*/
    regenerator_default.a.mark(function _callee() {
      var stream;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({
                isLoading: true
              });

              _context.prev = 1;
              _context.next = 4;
              return PostComments_client.database.call("get_content_replies", [_this.state.author, _this.state.permlink]);

            case 4:
              stream = _context.sent;

              _this.setState({
                stream: stream,
                isLoading: false,
                hasMore: false
              });

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);

              _this.setState({
                error: _context.t0.message,
                isLoading: false
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 8]]);
    })));

    return _this;
  }

  PostComments_createClass(PostComments, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.onscroll = function () {
        var streamComments = _this2.streamComments,
            _this2$state = _this2.state,
            error = _this2$state.error,
            isLoading = _this2$state.isLoading,
            hasMore = _this2$state.hasMore;
        if (error || isLoading || !hasMore) return;

        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
          streamComments();
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          error = _this$state.error,
          isLoading = _this$state.isLoading; // todo: Add support for comments with children

      return external_react_default.a.createElement(external_react_["Fragment"], null, this.state.stream.map(function (comment) {
        if (Object(isBlacklisted["a" /* default */])(comment.author, "none") != true) {
          var getbody = comment.body.replace(/(?:(?<=(?:src="))|(?:(?<=(?:\())))((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:(?=["|)]))/gi, "https://steemitimages.com/1000x0/$1").replace(/(?:(?<=[^"|^(|^s|^t]))((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:(?=[^"|^)]))/gi, '<img src="https://steemitimages.com/1000x0/$1"/>').replace(/^(https:\/\/steemitimages\.com\/0x0\/)/, "");
          var htmlBody = helpers_RegexBody(getbody, {}, "text").replace(/https:\/\/steemit.com/gi, "").replace(/(href=)(?=(?:"http))/gi, 'rel="nofollow" href=').replace(/(target="_blank" href=)(?=(?:"\/))/gi, "href=");
          var bodyText = {
            __html: htmlBody
          };
          var json_date = '{ "date": "' + comment.created + 'Z" }';
          var date_object = new Date(JSON.parse(json_date, dateFromJsonString["a" /* default */]).date);
          var created = date_object.toDateString();
          return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(Card_default.a, {
            className: "mb-3"
          }, external_react_default.a.createElement(CardHeader_default.a, {
            avatar: external_react_default.a.createElement(link_default.a, {
              as: "/@".concat(comment.author),
              href: "/blog?author=".concat(comment.author),
              passHref: true
            }, external_react_default.a.createElement("a", null, external_react_default.a.createElement(Avatar_default.a, {
              className: "cpointer",
              src: "https://steemitimages.com/u/".concat(comment.author, "/avatar/small")
            }))),
            action: external_react_default.a.createElement(IconButton_default.a, null, external_react_default.a.createElement(MoreVert_default.a, null)),
            title: external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(link_default.a, {
              as: "/@".concat(comment.author),
              href: "/blog?author=".concat(comment.author),
              passHref: true
            }, external_react_default.a.createElement("a", {
              className: "text-dark cpointer"
            }, comment.author))),
            subheader: created
          }), external_react_default.a.createElement(CardContent_default.a, null, external_react_default.a.createElement("div", {
            className: "postcontent",
            dangerouslySetInnerHTML: bodyText
          }))));
        }
      }), !error && external_react_default.a.createElement(Typography_default.a, null, error), isLoading && external_react_default.a.createElement(Grid_default.a, {
        item: true,
        xs: 1
      }, external_react_default.a.createElement(CircularProgress_default.a, null)));
    }
  }]);

  return PostComments;
}(external_react_["Component"]);

/* harmony default export */ var components_PostComments = (PostComments_PostComments);
// EXTERNAL MODULE: external "sanitize-html"
var external_sanitize_html_ = __webpack_require__(6);
var external_sanitize_html_default = /*#__PURE__*/__webpack_require__.n(external_sanitize_html_);

// EXTERNAL MODULE: external "reading-time"
var external_reading_time_ = __webpack_require__(28);
var external_reading_time_default = /*#__PURE__*/__webpack_require__.n(external_reading_time_);

// EXTERNAL MODULE: external "@material-ui/icons/FlightTakeoff"
var FlightTakeoff_ = __webpack_require__(19);
var FlightTakeoff_default = /*#__PURE__*/__webpack_require__.n(FlightTakeoff_);

// EXTERNAL MODULE: external "@material-ui/icons/BookmarkBorder"
var BookmarkBorder_ = __webpack_require__(53);
var BookmarkBorder_default = /*#__PURE__*/__webpack_require__.n(BookmarkBorder_);

// CONCATENATED MODULE: ./pages/post.js


function post_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { post_typeof = function _typeof(obj) { return typeof obj; }; } else { post_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return post_typeof(obj); }

function post_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function post_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { post_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { post_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function post_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function post_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function post_createClass(Constructor, protoProps, staticProps) { if (protoProps) post_defineProperties(Constructor.prototype, protoProps); if (staticProps) post_defineProperties(Constructor, staticProps); return Constructor; }

function post_possibleConstructorReturn(self, call) { if (call && (post_typeof(call) === "object" || typeof call === "function")) { return call; } return post_assertThisInitialized(self); }

function post_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function post_getPrototypeOf(o) { post_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return post_getPrototypeOf(o); }

function post_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) post_setPrototypeOf(subClass, superClass); }

function post_setPrototypeOf(o, p) { post_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return post_setPrototypeOf(o, p); }















var post_client = new external_dsteem_["Client"]("https://api.steemit.com");











var post_Post =
/*#__PURE__*/
function (_Component) {
  post_inherits(Post, _Component);

  function Post() {
    post_classCallCheck(this, Post);

    return post_possibleConstructorReturn(this, post_getPrototypeOf(Post).apply(this, arguments));
  }

  post_createClass(Post, [{
    key: "render",
    value: function render() {
      if (this.props.blog.post.id === 0) {
        return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(Grid_default.a, {
          container: true,
          spacing: 0,
          alignItems: "center",
          justify: "center"
        }, external_react_default.a.createElement(Grid_default.a, {
          item: true,
          lg: 7,
          md: 8,
          sm: 11,
          xs: 12
        }, external_react_default.a.createElement(Card_default.a, null, external_react_default.a.createElement(CardContent_default.a, null, external_react_default.a.createElement(Typography_default.a, null, "This post does not exist on TravelFeed yet."))))));
      } else if (typeof this.props.blog.post.blacklisted !== "undefined" || this.props.blog.post.readtime.words < 250) {
        return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(Grid_default.a, {
          container: true,
          spacing: 0,
          alignItems: "center",
          justify: "center"
        }, external_react_default.a.createElement(Grid_default.a, {
          item: true,
          lg: 7,
          md: 8,
          sm: 11,
          xs: 12
        }, external_react_default.a.createElement(Card_default.a, null, external_react_default.a.createElement(CardContent_default.a, null, external_react_default.a.createElement(Typography_default.a, null, "This post or author is blacklisted from TravelFeed."))))));
      } else {
        var author = this.props.blog.post.author.replace(/^\w/, function (c) {
          return c.toUpperCase();
        });
        return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(external_react_helmet_default.a, null, external_react_default.a.createElement("title", null, this.props.blog.post.title + " - " + author + "'s Blog on TravelFeed"), external_react_default.a.createElement("link", {
          rel: "canonical",
          href: this.props.blog.post.canonicalUrl
        }), external_react_default.a.createElement("meta", {
          property: "description",
          content: this.props.blog.post.excerpt
        }), external_react_default.a.createElement("meta", {
          property: "og:title",
          content: this.props.blog.post.title + " - TravelFeed"
        }), external_react_default.a.createElement("meta", {
          property: "og:type",
          content: "article"
        }), external_react_default.a.createElement("meta", {
          property: "og:url",
          content: "https://travelfeed.io/@" + this.props.blog.post.author + "/" + this.props.blog.post.permlink
        }), external_react_default.a.createElement("meta", {
          property: "og:image",
          content: this.props.blog.post.image
        }), external_react_default.a.createElement("meta", {
          property: "og:description",
          content: this.props.blog.post.excerpt
        }), external_react_default.a.createElement("meta", {
          property: "twitter:card",
          content: this.props.blog.post.image ? "summary_large_image" : "summary"
        }), external_react_default.a.createElement("meta", {
          property: "twitter:title",
          content: this.props.blog.post.title + " - TravelFeed"
        }), external_react_default.a.createElement("meta", {
          property: "twitter:description",
          content: this.props.blog.post.excerpt
        }), external_react_default.a.createElement("meta", {
          property: "twitter:image",
          content: this.props.blog.post.image
        })), external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(Grid_default.a, {
          container: true,
          spacing: 0,
          className: "pt-4",
          alignItems: "center",
          justify: "center"
        }, external_react_default.a.createElement(Grid_default.a, {
          item: true,
          lg: 7,
          md: 8,
          sm: 11,
          xs: 12,
          className: "pb-4"
        }, external_react_default.a.createElement(Card_default.a, null, external_react_default.a.createElement(CardHeader_default.a, {
          avatar: external_react_default.a.createElement(link_default.a, {
            as: "/@".concat(this.props.blog.post.author),
            href: "/blog?author=".concat(this.props.blog.post.author),
            passHref: true,
            prefetch: true
          }, external_react_default.a.createElement("a", null, external_react_default.a.createElement(Avatar_default.a, {
            className: "cpointer",
            src: "https://steemitimages.com/u/".concat(this.props.blog.post.author, "/avatar/small")
          }))),
          action: external_react_default.a.createElement(IconButton_default.a, null, external_react_default.a.createElement(BookmarkBorder_default.a, null)),
          title: external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(link_default.a, {
            as: "/@".concat(this.props.blog.post.author),
            href: "/blog?author=".concat(this.props.blog.post.author),
            passHref: true
          }, external_react_default.a.createElement("a", {
            className: "text-dark cpointer"
          }, this.props.blog.post.author)), external_react_default.a.createElement(Button_default.a, {
            variant: "outlined",
            size: "small",
            color: "primary",
            className: "ml-2 p-0"
          }, "Follow")),
          subheader: this.props.blog.post.created + " | " + this.props.blog.post.readtime.text
        }), external_react_default.a.createElement(CardContent_default.a, null, external_react_default.a.createElement(Typography_default.a, {
          variant: "display1",
          className: "text-dark font-weight-bold"
        }, this.props.blog.post.title), external_react_default.a.createElement("hr", null), external_react_default.a.createElement("div", {
          className: "postcontent",
          dangerouslySetInnerHTML: this.props.blog.post.bodyText
        }), external_react_default.a.createElement("hr", null), external_react_default.a.createElement("div", {
          className: "container"
        }, external_react_default.a.createElement("div", {
          className: "row justify-content-center"
        }, external_react_default.a.createElement("div", {
          className: "col-lg-6 col-md-9 col-sm-12"
        }, external_react_default.a.createElement(components_PostAuthorProfile, {
          author: this.props.blog.post.author
        })))), external_react_default.a.createElement("hr", null), external_react_default.a.createElement("div", {
          className: "container"
        }, external_react_default.a.createElement("div", {
          className: "row"
        }, external_react_default.a.createElement("div", {
          className: "col-2 p-0"
        }, external_react_default.a.createElement(IconButton_default.a, {
          "aria-label": "Upvote"
        }, external_react_default.a.createElement(FlightTakeoff_default.a, {
          className: "mr"
        })), external_react_default.a.createElement("span", {
          className: "text-muted font-weight-bold"
        }, this.props.blog.post.totalmiles)), external_react_default.a.createElement("div", {
          className: "col-10 text-right p-0 pt-2"
        }, this.props.blog.post.tags.map(function (tag) {
          return external_react_default.a.createElement(link_default.a, {
            as: "/created/".concat(tag),
            href: "/tag?sortby=created&tag=".concat(tag),
            key: tag,
            passHref: true
          }, external_react_default.a.createElement("a", null, external_react_default.a.createElement("span", {
            className: "badge badge-secondary m-1 p-1 pl-2 pr-2 rounded cpointer"
          }, tag)));
        }))))))), external_react_default.a.createElement(Grid_default.a, {
          item: true,
          lg: 6,
          md: 7,
          sm: 10,
          xs: 11,
          className: "pb-2"
        }, external_react_default.a.createElement(components_PostComments, {
          author: this.props.blog.post.author,
          permlink: this.props.blog.post.permlink
        })))));
      }
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = post_asyncToGenerator(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee(props) {
        var author, permlink, _blog, post, _blog2, _blog3, json, tags, json_date, date_object, created, image, htmlBody, bodyText, excerpt_title, canonicalUrl, sanitized, readtime, excerpt, totalmiles, vote, blog;

        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                author = props.query.author;
                permlink = props.query.permlink;

                if (!(Object(isBlacklisted["a" /* default */])(author, permlink) === true)) {
                  _context.next = 5;
                  break;
                }

                _blog = {
                  post: {
                    blacklisted: true
                  }
                };
                return _context.abrupt("return", {
                  blog: _blog
                });

              case 5:
                _context.next = 7;
                return post_client.call("condenser_api", "get_content", [author, permlink]);

              case 7:
                post = _context.sent;

                if (!(post.id === 0 || JSON.parse(post.json_metadata).tags.indexOf("travelfeed") > -1 === false)) {
                  _context.next = 11;
                  break;
                }

                _blog2 = {
                  post: {
                    id: 0
                  }
                };
                return _context.abrupt("return", {
                  blog: _blog2
                });

              case 11:
                if (!(post.id === 0 || JSON.parse(post.json_metadata).tags.indexOf("nsfw") > -1 === true)) {
                  _context.next = 14;
                  break;
                }

                _blog3 = {
                  post: {
                    blacklisted: true
                  }
                };
                return _context.abrupt("return", {
                  blog: _blog3
                });

              case 14:
                json = JSON.parse(post.json_metadata);
                tags = json.tags != "undefined" ? json.tags : [""];
                json_date = '{ "date": "' + post.created + 'Z" }';
                date_object = new Date(JSON.parse(json_date, dateFromJsonString["a" /* default */]).date);
                created = date_object.toDateString();
                image = Object(getImage["a" /* default */])(post.json_metadata, post.body, "1000x0");
                htmlBody = helpers_RegexBody(post.body);
                bodyText = {
                  __html: htmlBody
                };
                excerpt_title = post.title.length > 100 ? post.title.substring(0, 96) + "[...]" : post.title; // todo: Implement canonical URL from condenser

                canonicalUrl = "https://steemit.com/travelfeed/@" + post.author + "/" + post.permlink;
                sanitized = external_sanitize_html_default()(htmlBody, {
                  allowedTags: []
                });
                readtime = external_reading_time_default()(sanitized);
                excerpt = sanitized.substring(0, 143) + "[...] by ".concat(post.author);
                totalmiles = 0; //Proposal for voting system: Each user can give between 0.1 and 10 "miles", each 0.1 mile equals a 1% upvote.

                for (vote = 0; vote < post.active_votes.length; vote++) {
                  totalmiles += Math.round(post.active_votes[vote].percent / 1000);
                }

                blog = {
                  post: {
                    permlink: post.permlink,
                    author: post.author,
                    title: post.title,
                    tags: tags,
                    created: created,
                    image: image,
                    bodyText: bodyText,
                    excerpt: excerpt,
                    excerpt_title: excerpt_title,
                    canonicalUrl: canonicalUrl,
                    readtime: readtime,
                    totalmiles: totalmiles
                  }
                };
                return _context.abrupt("return", {
                  blog: blog
                });

              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return Post;
}(external_react_["Component"]);

/* harmony default export */ var pages_post = __webpack_exports__["default"] = (post_Post);

/***/ })
/******/ ]);