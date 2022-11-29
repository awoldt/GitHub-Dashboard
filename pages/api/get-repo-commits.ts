// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";
import getRepoCommits from "../../functions/getRepoCommits";
import commit_details from "../../interfaces/commit_details";

type Data = {
  data: commit_details[] | null;
};

const OKTOKIT = new Octokit({
  auth: process.env.GITHUB_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const COMMIT_DATA: commit_details[] | null = await getRepoCommits(
    OKTOKIT,
    req.body.owner,
    req.body.repo
  );

  return res.json({ data: COMMIT_DATA });
}
