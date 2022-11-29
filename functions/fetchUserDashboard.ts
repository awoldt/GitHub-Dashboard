import { Dispatch, SetStateAction } from "react";
import owner_details from "../interfaces/owner_details";
import repo_details from "../interfaces/repo_details";
import axios from "axios";

export default async function fetchGithubDashboard(
  username: string,
  viewBy: string,
  numOfRepos: number,
  setRepo: Dispatch<SetStateAction<repo_details[] | undefined>>,
  setOwner: Dispatch<SetStateAction<owner_details | undefined>>,
  setLoad: Dispatch<SetStateAction<boolean>>
) {
  try {
    setLoad(true);
    const res = await axios.post("/api/get-user-dashboard", {
      username: username.trim(),
      view: viewBy,
      numberOfRepos: numOfRepos,
    });

    console.log(res.data);

    if (res.status === 200 && res.data.data.repos !== null) {
      setLoad(false);
      //makes updated at dates clean for user
      setRepo(
        res.data.data.repos.map((x: repo_details) => {
          x.updated_at = new Date(x.updated_at).toDateString();
          x.created_at = new Date(x.created_at).toDateString();
          return x;
        })
      );
      setOwner(res.data.data.owner);
    } else {
      setLoad(false);
      setRepo(undefined);
      setOwner(undefined);
      alert("Error fetching username " + username);
    }
  } catch (e) {
    setLoad(false);
    setRepo(undefined);
    setOwner(undefined);
    alert("Could not get account " + username);
  }
}
