import repo_details from "../../../backend/interfaces/repo_details";
import { Accordion } from "react-bootstrap";

export default function Repo({ data }: { data: repo_details }) {
  return (
    <div className="repo_div">
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <span className="text-muted">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-calendar"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
        </svg>{" "}
        Created on {data.created_at.split("T")[0]}
      </span>
      {data.commit_history !== null && (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Commits</Accordion.Header>
            <Accordion.Body>
              <div style={{ padding: "10px" }}>
                {data.commit_history?.map((x, index) => {
                  return (
                    <div key={index}>
                      <p style={{ marginBottom: "0px" }}>{x.message}</p>
                      <div style={{ marginBottom: "10px" }}>
                        {" "}
                        <code style={{ fontSize: "13px" }}>
                          Commit sha {x.sha}
                        </code>
                      </div>
                      {index !== data.commit_history!.length - 1 && (
                        <hr style={{ color: "white" }}></hr>
                      )}
                    </div>
                  );
                })}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  );
}
