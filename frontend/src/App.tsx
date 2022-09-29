import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import repo_details from "./interfaces/repo_details";
import owner_details from "./interfaces/owner_details";
import Repo from "./components/Repo";
import Search from "./components/SearchBar";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import fetchGithubDashboard from "./functions/getGithubDashboard";

function App() {
  const [repoList, setRepoList] = useState<repo_details[] | undefined>(
    undefined
  );
  const [ownerDetails, setOwnerDetails] = useState<owner_details | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [viewBy, setViewBy] = useState<string>("updated"); //default view for all repos
  const [username, setUsername] = useState<string>("");

  return (
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
              username={username}
              setUsername={setUsername}
            />
          </motion.div>
        </AnimatePresence>
      </MotionConfig>

      <Row>
        {ownerDetails !== undefined && repoList !== undefined && (
          <>
            <Col lg={4} style={{ marginTop: "50px" }} className="text-center">
              <MotionConfig transition={{ duration: 1 }}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ x: [-400, 0], opacity: [0, 1] }}
                    exit={{ opacity: 0 }}
                  >
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
                      Followers: {ownerDetails.num_of_followers} Following:{" "}
                      {ownerDetails.num_of_following}
                    </p>
                    {ownerDetails.twitter_username! && (
                      <>
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
                        <p style={{ display: "inline", marginLeft: "10px" }}>
                          Twitter -{" "}
                          <a
                            href={
                              "https://twitter.com/" +
                              ownerDetails.twitter_username
                            }
                            target="_blank"
                          >
                            @{ownerDetails.twitter_username}
                          </a>
                        </p>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </MotionConfig>
            </Col>

            <Col lg={8} style={{ marginTop: "50px" }}>
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
                      <select
                        id="view_by_select"
                        onChange={(e) => {
                          setViewBy(e.target.value);
                          fetchGithubDashboard(
                            username,
                            viewBy,
                            setRepoList,
                            setOwnerDetails,
                            setLoading
                          );
                        }}
                      >
                        <option value={"updated"}>Updated on</option>
                        <option value={"created"}>Created on</option>
                      </select>
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
                            <Repo data={x} />
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
    </Container>
  );
}

export default App;
