import express from "express";
import { Octokit } from "octokit";
import getRepositories from "./functions/getRepositories";
import bodyParser from "body-parser";
import repo_details from "./interfaces/repo_details";
import owner_details from "./interfaces/owner_details";
import getOwner from "./functions/getOwner";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

const OKTOKIT = new Octokit({
  auth: process.env.GITHUB_API_KEY,
});

interface github_data {
  repos: repo_details[] | null;
  owner: owner_details | null;
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

app.post("/api/get-user-dashboard", async (req, res) => {
  console.log("POST view is " + req.body.view);

  const OWNER_DATA: owner_details | null = await getOwner(
    OKTOKIT,
    req.body.username
  );

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
});

app.listen(8080, () => {
  console.log("APP LISTENING ON PORT 8080");
});
