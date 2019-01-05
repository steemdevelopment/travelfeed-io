import { comment_author_blacklist } from "../config";
import { author_blacklist } from "../config";
import { permlink_blacklist } from "../config";

const isBlacklisted = (author, permlink, options) => {
  if (options.commentblacklist == true) {
    if (comment_author_blacklist.indexOf(author) > -1 === true) {
      return true;
    }
  }
  if (
    author_blacklist.indexOf(author) > -1 === true ||
    permlink_blacklist.indexOf(permlink) > -1 === true
  ) {
    return true;
  }
  return false;
};

export default isBlacklisted;
