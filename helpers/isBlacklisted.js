var author_blacklist = [
  "partiko",
  "steem-ua",
  "ocdb",
  "steemitboard",
  "drotto",
  "treeplanter",
  "coolbot",
  "microbot",
  "cabbage-dealer",
  "entrust",
  "sharkbank",
  "sleepagent",
  "kakibukit",
  "ssg-community",
  "esteemapp",
  "steem-plus"
];
var permlink_blacklist = [];

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
