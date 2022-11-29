import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import repo_details from "../interfaces/repo_details";
import owner_details from "../interfaces/owner_details";
import Repo from "../components/Repo";
import Search from "../components/SearchBar";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import fetchGithubDashboard from "../functions/fetchUserDashboard";
import Head from "next/head";

function App() {
  const [repoList, setRepoList] = useState<repo_details[] | undefined>(
    undefined
  );
  const [ownerDetails, setOwnerDetails] = useState<owner_details | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [viewBy, setViewBy] = useState<string>("pushed"); //default view for all repos
  const [numOfRepos, setNumOfRepos] = useState<number>(25); //default number of repos to display
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (username !== "") {
      fetchGithubDashboard(
        username,
        viewBy,
        numOfRepos,
        setRepoList,
        setOwnerDetails,
        setLoading
      );
    }
  }, [viewBy, numOfRepos]);

  return (
    <>
      <Head>
        <title>GitHub Dashboard</title>
        <meta
          name="description"
          content="Get the most recent repository data for any public GitHub profile"
        />
      </Head>
      <Container fluid>
        <Container>
          <MotionConfig transition={{ duration: 1 }}>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ y: [-300, 0], opacity: [0, 1] }}
                exit={{ opacity: 0 }}
              >
                <Search
                  setRepo={setRepoList}
                  setOwner={setOwnerDetails}
                  setLoad={setLoading}
                  ifLoading={loading}
                  currentView={viewBy}
                  numOfRepos={numOfRepos}
                  setNumOfRepos={setNumOfRepos}
                  username={username}
                  setUsername={setUsername}
                  repoData={repoList}
                  ownerData={ownerDetails}
                />
              </motion.div>
            </AnimatePresence>
          </MotionConfig>

          <Row>
            {ownerDetails !== undefined && repoList !== undefined && (
              <>
                <Col
                  lg={4}
                  style={{ marginTop: "50px" }}
                  className="text-center"
                >
                  <MotionConfig transition={{ duration: 1 }}>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ x: [-400, 0], opacity: [0, 1] }}
                        exit={{ opacity: 0 }}
                      >
                        <div id="owner_description_col">
                          <img
                            className="img-fluid"
                            id="avatar_img"
                            src={ownerDetails.avatar}
                          />
                          {ownerDetails.name! && <h1>{ownerDetails.name}</h1>}
                          {ownerDetails.bio! && <p>{ownerDetails.bio}</p>}

                          {ownerDetails.location! && (
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="white"
                                className="bi bi-geo-alt"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                              </svg>{" "}
                              {ownerDetails.location}
                            </span>
                          )}
                          <p>
                            Followers: {ownerDetails.num_of_followers}{" "}
                            Following: {ownerDetails.num_of_following}
                          </p>
                          {ownerDetails.twitter_username! && (
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#1DA1F2"
                                className="bi bi-twitter"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                              </svg>
                              <p
                                style={{
                                  display: "inline",
                                  marginLeft: "10px",
                                }}
                              >
                                <a
                                  href={
                                    "https://twitter.com/" +
                                    ownerDetails.twitter_username
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  @{ownerDetails.twitter_username}
                                </a>
                              </p>
                            </div>
                          )}
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="white"
                              className="bi bi-github"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>{" "}
                            <p
                              style={{ display: "inline", marginLeft: "10px" }}
                            >
                              <a
                                href={ownerDetails.html_url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {ownerDetails.html_url.split("https://")[1]}
                              </a>
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </MotionConfig>
                </Col>
                <Col lg={1}></Col>

                <Col lg={7} style={{ marginTop: "50px" }}>
                  {repoList.length === 0 && (
                    <p className="text-center">
                      User does not have any repositories yet
                    </p>
                  )}

                  {repoList.length !== 0 && (
                    <MotionConfig transition={{ duration: 1.25 }}>
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ x: [400, 0], opacity: [0, 1] }}
                          exit={{ opacity: 0 }}
                        >
                          <div>
                            <code
                              style={{
                                display: "block",
                                marginBottom: "25px",
                                fontSize: "20px",
                              }}
                            >
                              Showing {repoList.length} repositories sorted by{" "}
                              {viewBy === "pushed" && "latest updated"}
                              {viewBy === "created" && "creation date"}
                            </code>
                            <select
                              id="view_by_select"
                              onChange={(e) => {
                                setViewBy(e.target.value);
                              }}
                            >
                              <option value={"pushed"}>Updated on</option>
                              <option value={"created"}>Created on</option>
                            </select>
                            <select
                              id="num_of_repos_select"
                              onChange={(e) => {
                                setNumOfRepos(Number(e.target.value));
                              }}
                            >
                              <option value={"25"}>25</option>
                              <option value={"50"}>50</option>
                              <option value={"75"}>75</option>
                              <option value={"100"}>100</option>
                            </select>
                          </div>
                          <hr></hr>
                        </motion.div>
                        {repoList.length !== 0 &&
                          repoList.map((x: repo_details, index: number) => {
                            return (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ x: [400, 0], opacity: [0, 1] }}
                                key={index}
                                exit={{ opacity: 0 }}
                              >
                                <div id={"repo_div_" + index}>
                                  <Repo
                                    data={x}
                                    ownerName={ownerDetails.login}
                                    repoIndex={index}
                                    currentRepoList={repoList}
                                    setRepoList={setRepoList}
                                    currentView={viewBy}
                                  />
                                </div>
                              </motion.div>
                            );
                          })}
                      </AnimatePresence>
                    </MotionConfig>
                  )}
                </Col>
              </>
            )}
          </Row>

          <MotionConfig transition={{ duration: 2 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }}>
              <span
                className="text-center"
                style={{
                  display: "block",
                  marginTop: "100px",
                  marginBottom: " 50px",
                }}
              >
                <a
                  href="https://awoldt.com/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "#6c757d" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-brush"
                    viewBox="0 0 16 16"
                    style={{ marginRight: "5px" }}
                  >
                    <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z" />
                  </svg>
                  Made by awoldt
                </a>
                <p className="text-muted mt-3">
                  All data gathered from GitHub API<br></br>This site has no
                  affiliation with GitHub
                </p>
              </span>
            </motion.div>
          </MotionConfig>
        </Container>
      </Container>
    </>
  );
}

export default App;
