const author_blacklist = [""];
const permlink_blacklist = [""];

const isBlacklisted = (author, permlink) => {
  if (
    author_blacklist.indexOf(author) > -1 === true ||
    permlink_blacklist.indexOf(permlink) > -1 === true
  ) {
    return true;
  }
  return false;
};

export default isBlacklisted;
