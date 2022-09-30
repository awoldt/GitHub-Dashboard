import { Octokit } from "octokit";
import commit_details from "../interfaces/commit_details";
import getRepoCommits from "./getRepoCommits";

export default async function getRepositories(
  oktokit: Octokit,

  view: "updated" | "created" | "pushed" | "full_name" | undefined,
  ownerLogin: string,
  repositoriesPerPage: number
) {
  try {
    const data = await oktokit.request("GET /users/{username}/repos", {
      type: "all",
      username: ownerLogin,
      sort: view,
      per_page: repositoriesPerPage,
    });

    if (data.status === 200) {
      return await Promise.all(
        data.data.map(async (x: any) => {
          //get commit data for each repo
          const commitData: commit_details[] | null = await getRepoCommits(
            oktokit,
            ownerLogin,
            x,
            repositoriesPerPage
          );

          return {
            name: x.name,
            private: x.private,
            html_url: x.html_url,
            description: x.description,
            created_at: x.created_at,
            updated_at: x.updated_at,
            homepage: x.homepage,
            language: x.language,
            default_branch: x.default_branch,
            commit_history: commitData,
          };
        })
      );
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}
