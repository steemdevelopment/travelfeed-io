import api from './steemConnectAPI';
import { getScToken, getUser } from './token';

export const vote = async (author, permlink, weight) => {
  api.setAccessToken(getScToken());
  const voter = getUser();
  return new Promise(resolve => {
    api.vote(voter, author, permlink, weight, (err, res) => {
      if (err) {
        resolve({
          success: false,
          message: `Could not vote${(typeof err === 'string' && `: ${err}`) ||
            (err.error_description && `: ${err.error_description}`)}`,
        });
      }
      if (res) {
        resolve({ success: true });
      }
    });
  });
};

export const comment = async (
  parentAuthor,
  parentPermlink,
  permlink,
  title,
  body,
  jsonMetadata,
  type,
) => {
  api.setAccessToken(getScToken());
  const author = getUser();
  return api.comment(
    parentAuthor,
    parentPermlink,
    author,
    permlink,
    title,
    body,
    jsonMetadata,
    await function(err) {
      if (type === 'comment') {
        if (err != undefined) {
          return { success: false, message: 'Comment could not be published' };
        }
        return { success: true, message: 'Comment was published successfully' };
      }
      if (err != undefined) {
        return { success: false, message: 'Post could not be published' };
      }
      return { success: true, message: 'Post was published successfully' };
    },
  );
};

export const follow = async following => {
  api.setAccessToken(getScToken());
  const follower = getUser();
  return new Promise(resolve => {
    api.follow(follower, following, (err, res) => {
      if (err) {
        resolve({
          success: false,
          message: `Could not follow user${(typeof err === 'string' &&
            `: ${err}`) ||
            (err.error_description && `: ${err.error_description}`)}`,
        });
      }
      if (res) {
        resolve({ success: true });
      }
    });
  });
};

export const unfollow = async unfollowing => {
  api.setAccessToken(getScToken());
  const unfollower = getUser();
  return new Promise(resolve => {
    api.unfollow(unfollower, unfollowing, (err, res) => {
      if (err) {
        resolve({
          success: false,
          message: `Could not unfollow user${(typeof err === 'string' &&
            `: ${err}`) ||
            (err.error_description && `: ${err.error_description}`)}`,
        });
      }
      if (res) {
        resolve({ success: true });
      }
    });
  });
};

export const customJson = async payload => {
  api.setAccessToken(getScToken());
  const author = getUser();
  const id = 'travelfeed';
  const requiredAuths = [];
  const requiredPostingAuths = [author];
  const json = JSON.stringify(payload);
  return new Promise(resolve => {
    api.customJson(
      requiredAuths,
      requiredPostingAuths,
      id,
      json,
      (err, res) => {
        if (err) {
          resolve({
            success: false,
            message: `Could not write custom_json to Blockchain${(typeof err ===
              'string' &&
              `: ${err}`) ||
              (err.error_description && `: ${err.error_description}`)}`,
          });
        }
        if (res) {
          resolve({
            success: true,
            message: 'Curation action was broadcasted sucessfully',
          });
        }
      },
    );
  });
};

export const broadcastActiveUser = async () => {
  api.setAccessToken(getScToken());
  const author = getUser();
  const id = 'active_user';
  const requiredAuths = [];
  const requiredPostingAuths = [author];
  const json = JSON.stringify({ app: 'travelfeed' });
  return api.customJson(requiredAuths, requiredPostingAuths, id, json);
};
