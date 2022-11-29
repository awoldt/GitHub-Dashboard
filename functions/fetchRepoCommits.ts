//returns commits from any repo

import axios from "axios";

export default async function fetchCommitData(owner: string, repo: string) {
  try {
    const res = await axios.post("/api/get-repo-commits", {
      owner: owner,
      repo: repo,
    });

    console.log(res.data);

    if (res.status === 200) {
      return res.data;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
