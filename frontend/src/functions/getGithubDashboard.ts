import { Dispatch, SetStateAction } from "react";
import owner_details from "../interfaces/owner_details";
import repo_details from "../interfaces/repo_details";
import axios from "axios";

export default async function fetchGithubDashboard(
  username: string,
  viewBy: string,
  setRepo: Dispatch<SetStateAction<repo_details[] | undefined>>,
  setOwner: Dispatch<SetStateAction<owner_details | undefined>>,
  setLoad: Dispatch<SetStateAction<boolean>>
) {
  try {
    setLoad(true);
    const res = await axios.post("/api/get-user-dashboard", {
      username: username.trim(),
      view: viewBy,
    });

    if (res.status === 200 && res.data.repos !== null) {
      setLoad(false);
      setRepo(res.data.repos);
      setOwner(res.data.owner);
    } else {
      setLoad(false);
      setRepo(undefined);
      setOwner(undefined);
      alert("Error fetching username " + username);
    }
  } catch (e) {
    alert("error while fetching gihub profile");
  }
}
