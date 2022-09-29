import { Octokit } from "octokit";

export default async function getOwner(oktokit: Octokit, username: string) {
  try {
    const data = await oktokit.request("GET /users/{username}", {
      username: username,
    });

    if (data.status === 200) {
      return {
        avatar: data.data.avatar_url,
        html_url: data.data.html_url,
        name: data.data.name,
        location: data.data.location,
        email: data.data.email,
        bio: data.data.bio,
        twitter_username: data.data.twitter_username,
        num_of_followers: data.data.followers,
        num_of_following: data.data.following,
        acct_created_on: data.data.created_at,
      };
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}
