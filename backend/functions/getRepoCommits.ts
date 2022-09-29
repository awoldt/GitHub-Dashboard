import { Octokit } from "octokit";
import repo_details from "../interfaces/repo_details";
import commit_details from "../interfaces/commit_details";

export default async function getRepoCommits(
  oktokit: Octokit,
  ownerName: string | null | undefined,
  repos: repo_details
) {
  try {
    let commitData: commit_details[] = [];

    const data = await oktokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: ownerName!,
      repo: repos.name,
    });
    //for each commit
    //only need the latest 10 commits 
    data.data.length > 10 ? data.data.splice(10) : null;
    for (let y = 0; y < data.data.length; ++y) {
      commitData.push({
        message: data.data[y].commit.message,
        html_url: data.data[y].html_url,
        sha: data.data[y].sha,
      });
    }

    return commitData;
  } catch (e) {
    console.log(e);
    return null;
  }
}
