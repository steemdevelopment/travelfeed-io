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
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
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
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var sanitize_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var sanitize_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sanitize_html__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_busy_Body__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(30);
/* harmony import */ var dsteem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var dsteem__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dsteem__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _helpers_getImage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(20);
/* harmony import */ var _helpers_isBlacklisted__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var reading_time__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(28);
/* harmony import */ var reading_time__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(reading_time__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _helpers_dateFromJsonString__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(21);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(11);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(35);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(36);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(12);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(37);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(2);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(5);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_icons_Star__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(38);
/* harmony import */ var _material_ui_icons_Star__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Star__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(13);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _material_ui_icons_FlightTakeoff__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(19);
/* harmony import */ var _material_ui_icons_FlightTakeoff__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_FlightTakeoff__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(4);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(22);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(29);
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(23);
/* harmony import */ var _material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_25__);


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


























var client = new dsteem__WEBPACK_IMPORTED_MODULE_6__["Client"]("https://api.steemit.com");

var PostGrid =
/*#__PURE__*/
function (_Component) {
  _inherits(PostGrid, _Component);

  function PostGrid() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PostGrid);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PostGrid)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      type: _this.props.type,
      filter: _this.props.filter,
      sortby: _this.props.sortby,
      error: false,
      hasMore: true,
      isLoading: false,
      position: _this.props.position,
      lastauthor: "",
      lastpermlink: "",
      selector: "",
      stream: _this.props.stream
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "streamBlog",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var lastpermlink, lastauthor, filtertype, tagargs, tagstream, args, stream, loadposts;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({
                isLoading: true
              });

              lastpermlink = _this.state.lastpermlink;
              lastauthor = _this.state.lastauthor;
              filtertype = "blog";

              if (_this.state.type == "tag") {
                filtertype = _this.state.sortby;
              }

              if (!(lastpermlink == "")) {
                _context.next = 11;
                break;
              }

              tagargs = {
                tag: _this.state.filter,
                limit: 25
              };
              _context.next = 9;
              return client.database.getDiscussions(filtertype, tagargs);

            case 9:
              tagstream = _context.sent;

              try {
                lastpermlink = tagstream.length > 0 ? tagstream[tagstream.length - 1].permlink : "";
                lastauthor = tagstream.length > 0 ? tagstream[tagstream.length - 1].author : "";
              } catch (err) {
                _this.setState({
                  error: err.message,
                  isLoading: false
                });
              }

            case 11:
              args = {
                tag: _this.state.filter,
                limit: 100,
                start_author: lastauthor,
                start_permlink: lastpermlink
              };

              if (_this.state.type == "curationfeed") {
                args = {
                  tag: _this.state.filter,
                  limit: 25,
                  start_author: lastauthor,
                  start_permlink: lastpermlink
                };
              } else if (_this.state.type == "tag") {
                args = {
                  tag: _this.state.filter,
                  limit: 100,
                  start_author: lastauthor,
                  start_permlink: lastpermlink
                };
              }

              if (_this.state.position == 0) {
                args = {
                  tag: _this.state.filter,
                  limit: 24
                };

                _this.setState({
                  position: 1
                });
              }

              _context.next = 16;
              return client.database.getDiscussions(filtertype, args);

            case 16:
              stream = _context.sent;
              lastpermlink = stream.length > 0 ? stream[stream.length - 1].permlink : "";
              lastauthor = stream.length > 0 ? stream[stream.length - 1].author : "";
              delete stream[stream.length - 1];

              try {
                if (stream.length == 0) {
                  _this.setState({
                    hasMore: false,
                    isLoading: false
                  });
                }

                loadposts = _this.state.stream.concat(stream);

                _this.setState({
                  lastpermlink: lastpermlink,
                  lastauthor: lastauthor,
                  stream: loadposts,
                  isLoading: false,
                  hasMore: true
                });
              } catch (err) {
                _this.setState({
                  error: err.message,
                  isLoading: false
                });
              }

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));

    return _this;
  }

  _createClass(PostGrid, [{
    key: "setSort",
    value: function () {
      var _setSort = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(sortby) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(sortby == "featured")) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 3;
                return this.setState({
                  sortby: sortby,
                  position: 0,
                  stream: [],
                  type: "curationfeed"
                });

              case 3:
                _context2.next = 7;
                break;

              case 5:
                _context2.next = 7;
                return this.setState({
                  sortby: sortby,
                  position: 0,
                  stream: [],
                  type: "tag"
                });

              case 7:
                window.history.pushState("", "", "/".concat(sortby, "/").concat(this.state.filter, "/"));
                this.streamBlog();

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setSort(_x) {
        return _setSort.apply(this, arguments);
      }

      return setSort;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.state.type == "tag") {
        this.setState({
          selector: "tag"
        });
      }

      if (this.state.type == "curationfeed") {
        this.setState({
          selector: "curationfeed"
        });
      }

      this.streamBlog();

      window.onscroll = function () {
        var streamBlog = _this2.streamBlog,
            _this2$state = _this2.state,
            error = _this2$state.error,
            isLoading = _this2$state.isLoading,
            hasMore = _this2$state.hasMore;
        if (error || isLoading || !hasMore) return;

        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
          streamBlog();
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var count = 0;
      var _this$state = this.state,
          error = _this$state.error,
          hasMore = _this$state.hasMore,
          isLoading = _this$state.isLoading;
      var processed = [];
      var selector = "";
      var featured_variant = this.state.sortby != "featured" ? "outlined" : "contained";
      var created_variant = this.state.sortby != "created" ? "outlined" : "contained";
      var hot_variant = this.state.sortby != "hot" ? "outlined" : "contained";
      var trending_variant = this.state.sortby != "trending" ? "outlined" : "contained";

      if (this.state.selector == "curationfeed") {
        var heading = "Feed";

        if (this.state.sortby == "featured") {
          heading = "Editor's Choice";
        }

        if (this.state.sortby == "created") {
          heading = "New Posts";
        }

        if (this.state.sortby == "hot") {
          heading = "Taking Off";
        }

        if (this.state.sortby == "trending") {
          heading = "Above the Clouds";
        }

        selector = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_17___default.a, {
          variant: "display1",
          align: "center",
          gutterBottom: true,
          className: "pt-5"
        }, heading), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_22___default.a, {
          item: true,
          lg: 12,
          md: 12,
          sm: 12,
          xs: 12
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: "pb-4 text-center"
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_18___default.a, {
          variant: featured_variant,
          color: "primary",
          className: "m-2",
          onClick: function onClick() {
            return _this3.setSort("featured");
          }
        }, "Featured"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_18___default.a, {
          variant: created_variant,
          color: "primary",
          className: "m-2",
          onClick: function onClick() {
            return _this3.setSort("created");
          }
        }, "New"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_18___default.a, {
          variant: hot_variant,
          color: "primary",
          className: "m-2",
          onClick: function onClick() {
            return _this3.setSort("hot");
          }
        }, "Hot"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_18___default.a, {
          variant: trending_variant,
          color: "primary",
          className: "m-2",
          onClick: function onClick() {
            return _this3.setSort("trending");
          }
        }, "Trending"))));
      } else if (this.state.selector == "tag") {
        selector = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_22___default.a, {
          item: true,
          lg: 12,
          md: 12,
          sm: 12,
          xs: 12
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: "pb-4 text-center"
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
          as: "/created/".concat(this.state.filter)
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_18___default.a, {
          variant: created_variant,
          color: "primary",
          className: "m-2",
          onClick: function onClick() {
            return _this3.setSort("created");
          }
        }, "Created")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
          as: "/hot/".concat(this.state.filter)
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_18___default.a, {
          variant: hot_variant,
          color: "primary",
          className: "m-2",
          onClick: function onClick() {
            return _this3.setSort("hot");
          }
        }, "Hot")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
          as: "/trending/".concat(this.state.filter)
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_18___default.a, {
          variant: trending_variant,
          color: "primary",
          className: "m-2",
          onClick: function onClick() {
            return _this3.setSort("trending");
          }
        }, "Trending"))));
      }

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_22___default.a, {
        container: true,
        spacing: 0,
        alignItems: "center",
        justify: "center",
        className: "p-3"
      }, selector, this.state.stream.map(function (post) {
        var json = JSON.parse(post.json_metadata);
        var htmlBody = Object(_components_busy_Body__WEBPACK_IMPORTED_MODULE_5__[/* getHtml */ "a"])(post.body, {}, "text");
        var sanitized = sanitize_html__WEBPACK_IMPORTED_MODULE_4___default()(htmlBody, {
          allowedTags: []
        });
        var readtime = reading_time__WEBPACK_IMPORTED_MODULE_10___default()(sanitized); // Filter out:
        // - Filter out duplicates. This does not work for some reason..
        // - Limit initial fetch to 7 posts
        // - Exclude resteems

        if ((processed.indexOf(post.permlink) > -1 === false && count < 8 || _this3.state.stream.length > 24) && (_this3.state.type == "tag" || _this3.state.type == "curationfeed" && post.author != _this3.state.filter || _this3.state.type == "blog" && post.author == _this3.state.filter) && Object(_helpers_isBlacklisted__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(post.author, post.permlink) === false && readtime.words > 250 && json.tags.indexOf("travelfeed") > -1 === true && json.tags.indexOf("nsfw") > -1 === false) {
          var replaceex = /[^\sa-zA-Z0-9(?)(')(`)(,)(\-)(’)(#)(!)(´)(:)(()())(\])([)]+/g;
          var excerpt = sanitized.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "").replace(replaceex, "").substring(0, 250);
          var title = post.title.replace(replaceex, "");
          title = title.length > 85 ? title.substring(0, 81) + "[...]" : title;
          var posttag = typeof json.tags != "undefined" && json.tags.length > 0 ? json.tags[1] : "";
          var json_date = '{ "date": "' + post.created + 'Z" }';
          var date_object = new Date(JSON.parse(json_date, _helpers_dateFromJsonString__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"]).date);
          var created = date_object.toDateString();
          var image = Object(_helpers_getImage__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(post.json_metadata, post.body, "400x0"); //todo: try fetching first image from post if no image is defined in json_metadata

          var totalmiles = 0;
          var iscurated = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null); //Proposal for voting system: Each user can give between 0.1 and 10 "miles", each 0.1 mile equals a 1% upvote.

          for (var vote = 0; vote < post.active_votes.length; vote++) {
            totalmiles += Math.round(post.active_votes[vote].percent / 1000);

            if (post.active_votes[vote].voter == "travelfeed" && post.active_votes[vote].percent > 8000) {
              iscurated = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_20___default.a, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Star__WEBPACK_IMPORTED_MODULE_19___default.a, null));
            }
          }

          ++count;
          processed.push(post.permlink);
          return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_22___default.a, {
            item: true,
            lg: 3,
            md: 4,
            sm: 6,
            xs: 12
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_12___default.a, {
            key: post.permlink,
            className: "m-2"
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_25___default.a, {
            avatar: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
              as: "/@".concat(post.author),
              href: "/blog?author=".concat(post.author),
              passHref: true
            }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_23___default.a, {
              style: {
                cursor: "pointer"
              },
              src: "https://steemitimages.com/u/".concat(post.author, "/avatar/small")
            }))),
            action: iscurated,
            title: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
              as: "/@".concat(post.author),
              href: "/blog?author=".concat(post.author),
              passHref: true
            }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
              className: "text-dark"
            }, post.author)),
            subheader: created + " | " + readtime.text
          }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_13___default.a, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_16___default.a, {
            style: {
              height: 140
            },
            className: "pt-2 text-right",
            image: image
          }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
            as: "/@".concat(post.author, "/").concat(post.permlink),
            href: "/post?author=".concat(post.author, "&permlink=").concat(post.permlink),
            passHref: true
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", null, " ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_15___default.a, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_17___default.a, {
            gutterBottom: true,
            variant: "h5",
            component: "h2"
          }, title), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_17___default.a, {
            component: "p"
          }, excerpt, " [...]"))))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_14___default.a, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
            className: "container"
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
            className: "col-6 p-0"
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_20___default.a, {
            "aria-label": "Upvote"
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_FlightTakeoff__WEBPACK_IMPORTED_MODULE_21___default.a, {
            className: "mr"
          })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
            className: "text-muted font-weight-bold"
          }, totalmiles)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
            className: "col-6 pt-2 p-0 text-right"
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
            as: "/created/".concat(posttag),
            href: "/tag?sortby=created&tag=".concat(posttag),
            passHref: true
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", null, " ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
            className: "badge badge-secondary p-1 pl-2 pr-2 rounded cpointer small",
            style: {
              fontSize: "0.6rem"
            }
          }, posttag.toUpperCase())))))))));
        }
      }), !error && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_17___default.a, null, error), isLoading && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "p-5"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_22___default.a, {
        item: true,
        xs: 1
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "p-5"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_24___default.a, null)))), !hasMore && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_17___default.a, null, "That is all :)")));
    }
  }]);

  return PostGrid;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

PostGrid.defaultProps = {
  stream: [{}],
  sortby: "featured",
  position: 25
};
/* harmony default export */ __webpack_exports__["a"] = (PostGrid);

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardActionArea");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardActions");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardMedia");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Star");

/***/ }),
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
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(61);


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dsteem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var dsteem__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dsteem__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_PostGrid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(34);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(10);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_10__);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











var client = new dsteem__WEBPACK_IMPORTED_MODULE_3__["Client"]("https://api.steemit.com");

var Tag =
/*#__PURE__*/
function (_Component) {
  _inherits(Tag, _Component);

  function Tag() {
    _classCallCheck(this, Tag);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tag).apply(this, arguments));
  }

  _createClass(Tag, [{
    key: "render",
    value: function render() {
      if (typeof this.props.args.stream.notfound !== "undefined") {
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_10___default.a, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("title", null, "404 - Not Found")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7___default.a, {
          container: true,
          spacing: 0,
          alignItems: "center",
          justify: "center"
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7___default.a, {
          item: true,
          lg: 7,
          md: 8,
          sm: 11,
          xs: 12
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_4___default.a, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_5___default.a, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, null, "This is not a valid tag."))))));
      } else {
        var description = "Explore posts about #" + this.props.args.tag + " on TravelFeed.";
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_10___default.a, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("title", null, "#" + this.props.args.tag + " - TravelFeed: The Travel Community"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
          property: "description",
          content: description
        }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
          property: "og:description",
          content: description
        })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "text-center pt-4 pb-2"
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, {
          variant: "display3"
        }, "#", this.props.args.tag)), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_PostGrid__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
          stream: this.props.args.stream,
          type: this.props.args.type,
          sortby: this.props.args.sortby,
          filter: this.props.args.tag
        }));
      }
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(props) {
        var sortby, tag, args, type, stream, _stream;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sortby = props.query.sortby;
                tag = props.query.tag;
                args = {
                  tag: tag,
                  limit: 24
                };
                type = "tag";

                if (sortby == "featured") {
                  type = "blog";
                  sortby = "blog";
                }

                _context.prev = 5;
                _context.next = 8;
                return client.database.getDiscussions(sortby, args);

              case 8:
                stream = _context.sent;

                if (sortby == "blog") {
                  type = "curationfeed";
                  sortby = "featured";
                }

                return _context.abrupt("return", {
                  args: {
                    sortby: sortby,
                    tag: tag,
                    type: type,
                    stream: stream
                  }
                });

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](5);
                _stream = {
                  args: {
                    stream: {
                      notfound: true
                    }
                  }
                };
                return _context.abrupt("return", _stream);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 13]]);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return Tag;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Tag);

/***/ })
/******/ ]);