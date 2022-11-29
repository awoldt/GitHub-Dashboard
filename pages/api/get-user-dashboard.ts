// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import getOwner from "../../functions/getOwner";
import owner_details from "../../interfaces/owner_details";
import { Octokit } from "octokit";
import github_data from "../../interfaces/github_data";
import repo_details from "../../interfaces/repo_details";
import getRepositories from "../../functions/getRepositories";

const OKTOKIT = new Octokit({
  auth: process.env.GITHUB_API_KEY,
});

type Data = {
  data: github_data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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

    res.json({ data: RETURNDATA });
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

    res.json({ data: RETURNDATA });
  }
}
