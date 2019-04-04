import api from "./SteemConnectAPI";
import { getUser, getToken } from "./token";

export const vote = async (author, permlink, weight) => {
  api.setAccessToken(getToken());
  const voter = getUser();
  return await api.vote(
    voter,
    author,
    permlink,
    weight,
    await function(err) {
      if (err != undefined) {
        return ["Could not vote: " + err, "error"];
      }
      return;
    }
  );
};

export const comment = async (
  parentAuthor,
  parentPermlink,
  permlink,
  title,
  body,
  jsonMetadata
) => {
  api.setAccessToken(getToken());
  const author = getUser();
  return await api.comment(
    parentAuthor,
    parentPermlink,
    author,
    permlink,
    title,
    body,
    jsonMetadata,
    await function(err) {
      if (err != undefined) {
        return ["Could not post: " + err, "error"];
      }
      return ["Post was posted successfully", "success"];
    }
  );
};

export const follow = async following => {
  api.setAccessToken(getToken());
  const follower = getUser();
  return await api.follow(
    follower,
    following,
    await function(err) {
      if (err != undefined) {
        return ["Could not follow user: " + err, "error"];
      }
      return;
    }
  );
};

export const unfollow = async unfollowing => {
  api.setAccessToken(getToken());
  const unfollower = getUser();
  return await api.unfollow(
    unfollower,
    unfollowing,
    await function(err) {
      if (err != undefined) {
        return ["Could not unfollow user: " + err, "error"];
      }
      return;
    }
  );
};

export const ignore = async following => {
  api.setAccessToken(getToken());
  const follower = getUser();
  return await api.ignore(
    follower,
    following,
    await function(err) {
      if (err != undefined) {
        return ["Could not ignore user: " + err, "error"];
      }
      return;
    }
  );
};

export const customJson = async payload => {
  api.setAccessToken(getToken());
  const author = getUser();
  return await api.broadcast(
    [
      [
        "custom_json",
        {
          id: "travelfeed",
          required_auths: [],
          required_posting_auths: [author],
          json: JSON.stringify(payload)
        }
      ]
    ],
    await function(err) {
      if (err != undefined) {
        return ["Could not write custom_json to Blockchain: " + err, "error"];
      }
      return ["Custom Json was successfully submitted", "success"];
    }
  );
};
