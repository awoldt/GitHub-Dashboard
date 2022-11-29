import { Octokit } from "octokit";

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
      return data.data.map((x: any) => {
        return {
          name: x.name,
          private: x.private,
          html_url: x.html_url,
          description: x.description,
          created_at: x.created_at,
          updated_at: x.pushed_at,
          homepage: x.homepage,
          language: x.language,
          default_branch: x.default_branch,
          commit_history: null, //will be null until user requests commit data
        };
      });
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
