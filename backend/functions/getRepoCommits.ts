import { Octokit } from "octokit";
import repo_details from "../interfaces/repo_details";
import commit_details from "../interfaces/commit_details";

export default async function getRepoCommits(
  oktokit: Octokit,
  ownerName: string | null | undefined,
  repos: repo_details,
  reposPerPage: number
) {
  try {
    let commitData: commit_details[] = [];

    const data = await oktokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: ownerName!,
      repo: repos.name,
      per_page: reposPerPage === 25 ? 7 : reposPerPage === 50 ? 5 : reposPerPage === 75 ? 3 : 2,
    });

    if (data.status === 200) {
      for (let y = 0; y < data.data.length; ++y) {
        commitData.push({
          message: data.data[y].commit.message,
          html_url: data.data[y].html_url,
          sha: data.data[y].sha,
        });
      }

      return commitData;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}
