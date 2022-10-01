import { Octokit } from "octokit";

export default async function (oktokit: Octokit, owner: string, repo: string) {
  try {
    const data = await oktokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: owner,
      repo: repo,
      per_page: 10,
    });

    return data.data.map((x: any) => {
      return {
        sha: x.sha,
        message: x.commit.message,
        author: x.commit.author.name,
        html_url: x.html_url,
      };
    });
  } catch (e) {
    return null;
  }
}
