import commit_details from "./commit_details";

export default interface repo_details {
  name: string;
  private: boolean;
  html_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  homepage: string;
  language: string;
  default_branch: string;
  commit_history: commit_details[] | null;
}
