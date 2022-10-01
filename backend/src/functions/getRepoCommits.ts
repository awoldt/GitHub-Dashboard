import { Octokit } from "octokit";

export default async function (oktokit: Octokit, owner: string, repo: string) {
  try {
    const data = await oktokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: owner,
      repo: repo,
    });

    return data.data.map((x: any) => {
      return {
        sha: x.sha,
        message: x.commit.message,
        author: x.commit.author.name
      };
    });
  } catch (e) {
    return null;
  }
}
