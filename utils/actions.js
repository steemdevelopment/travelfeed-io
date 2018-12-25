import api from "./SteemConnectAPI";
import { getUser, getToken } from "./token";

export const vote = (author, permlink, weight) => {
  api.setAccessToken(getToken());
  const voter = getUser();
  api.vote(voter, author, permlink, weight);
};

export const comment = (
  parentAuthor,
  parentPermlink,
  permlink,
  title,
  body,
  jsonMetadata
) => {
  api.setAccessToken(getToken());
  const author = getUser();
  api.comment(
    parentAuthor,
    parentPermlink,
    author,
    permlink,
    title,
    body,
    jsonMetadata
  );
};

export const follow = following => {
  api.setAccessToken(getToken());
  const follower = getUser();
  api.follow(follower, following);
};

export const unfollow = unfollowing => {
  api.setAccessToken(getToken());
  const unfollower = getUser();
  api.unfollow(unfollower, unfollowing);
};

export const ignore = following => {
  api.setAccessToken(getToken());
  const follower = getUser();
  api.ignore(follower, following);
};
