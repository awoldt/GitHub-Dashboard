import owner_details from "./owner_details";
import repo_details from "./repo_details";

export default interface github_data {
  repos: repo_details[] | null;
  owner: owner_details | null;
}
