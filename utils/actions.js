import api from "./SteemConnectAPI";
import { getUser, getScToken } from "./token";

export const vote = async (author, permlink, weight) => {
  api.setAccessToken(getScToken());
  const voter = getUser();
  return await api.vote(
    voter,
    author,
    permlink,
    weight,
    await function(err) {
      if (err != undefined) {
        return { success: false, message: "Could not vote" };
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
  jsonMetadata,
  type
) => {
  api.setAccessToken(getScToken());
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
      if (type === "comment") {
        if (err != undefined) {
          return { success: false, message: "Comment could not be published" };
        }
        return { success: true, message: "Comment was published successfully" };
      }
      if (err != undefined) {
        return { success: false, message: "Post could not be published" };
      }
      return { success: true, message: "Post was published successfully" };
    }
  );
};

export const follow = async following => {
  api.setAccessToken(getScToken());
  const follower = getUser();
  return await api.follow(
    follower,
    following,
    await function(err) {
      if (err != undefined) {
        return { success: false, message: "Could not follow user" };
      }
      return;
    }
  );
};

export const unfollow = async unfollowing => {
  api.setAccessToken(getScToken());
  const unfollower = getUser();
  return await api.unfollow(
    unfollower,
    unfollowing,
    await function(err) {
      if (err != undefined) {
        return { success: false, message: "Could not unfollow user" };
      }
      return;
    }
  );
};

export const ignore = async following => {
  api.setAccessToken(getScToken());
  const follower = getUser();
  return await api.ignore(
    follower,
    following,
    await function(err) {
      if (err != undefined) {
        return { success: false, message: "Could not ignore user" };
      }
      return;
    }
  );
};

export const customJson = async payload => {
  api.setAccessToken(getScToken());
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
        return {
          success: false,
          message: "Could not write custom_json to Blockchain"
        };
      }
      return {
        success: true,
        message: "Custom Json was successfully submitted"
      };
    }
  );
};

export const broadcastActiveUser = async () => {
  api.setAccessToken(getScToken());
  const author = getUser();
  return await api.broadcast([
    [
      "custom_json",
      {
        id: "active_user",
        required_auths: [],
        required_posting_auths: [author],
        json: JSON.stringify({ app: "travelfeed" })
      }
    ]
  ]);
};
