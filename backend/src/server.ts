import express from "express";
import { Octokit } from "octokit";
import getRepositories from "./functions/getRepositories";
import bodyParser from "body-parser";
import repo_details from "./interfaces/repo_details";
import owner_details from "./interfaces/owner_details";
import getOwner from "./functions/getOwner";
import getRepoCommits from "./functions/getRepoCommits";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import commit_details from "./interfaces/commit_details";
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "build")));

const OKTOKIT = new Octokit({
  auth: process.env.GITHUB_API_KEY,
});

interface github_data {
  repos: repo_details[] | null;
  owner: owner_details | null;
}

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "frontend", "build", "index.html")
  );
});

app.post("/api/get-user-dashboard", async (req, res) => {
  const OWNER_DATA: owner_details | null = await getOwner(
    OKTOKIT,
    req.body.username
  );

  //if there is no owner data, return null for both repo and user
  if (OWNER_DATA === null) {
    const RETURNDATA: github_data = {
      repos: null,
      owner: null,
    };

    await res.json(RETURNDATA);
  } else {
    const REPO_DATA: repo_details[] | null = await getRepositories(
      OKTOKIT,
      req.body.view,
      OWNER_DATA!.login,
      req.body.numberOfRepos
    );

    const RETURNDATA: github_data = {
      repos: REPO_DATA,
      owner: OWNER_DATA,
    };

    await res.json(RETURNDATA);
  }
});

app.post("/api/get-repo-commits", async (req, res) => {
  const COMMIT_DATA: commit_details[] | null = await getRepoCommits(
    OKTOKIT,
    req.body.owner,
    req.body.repo
  );

  return res.json(COMMIT_DATA);
});

app.listen(8080, () => {
  console.log("APP LISTENING ON PORT 8080");
});
