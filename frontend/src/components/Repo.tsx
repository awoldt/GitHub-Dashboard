import repo_details from "../interfaces/repo_details";
import fetchCommitData from "../functions/fetchCommitData";
import commit_details from "../interfaces/commit_details";
import "../language-colors.css"

export default function Repo({
  data,
  ownerName,
  repoIndex,
  currentRepoList,
  setRepoList,
  currentView,
}: {
  data: repo_details;
  ownerName: string;
  repoIndex: number;
  currentRepoList: repo_details[];
  setRepoList: React.Dispatch<React.SetStateAction<repo_details[] | undefined>>;
  currentView: string;
}) {
  return (
    <div className="repo_div">
      <div style={{ marginBottom: "25px" }}>
        <a
          href={data.html_url}
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <h2 style={{ display: "inline", marginRight: "20px", fontWeight: 'bold'}}>
            {data.name}
          </h2>
        </a>

        {data.language! && (
          <span style={{ fontWeight: "bold" }} className={data.language}>({data.language})</span>
        )}
        {data.description === null && <p className="text-muted"><i>(no description)</i></p>}
        <p style={{ marginBottom: "0px", marginTop: "5px" }}>
          {data.description}
        </p>
        {currentView === "pushed" && (
          <p className="text-muted">
            <i>Last push to repo was on {data.updated_at}</i>
          </p>
        )}
        {currentView === "created" && (
          <p className="text-muted">
            <i>Repo was created on {data.created_at}</i>
          </p>
        )}
      </div>

      {data.commit_history === null && (
        <code
          onClick={async () => {
            const res = await fetchCommitData(ownerName, data.name);

            const x: repo_details[] = [...currentRepoList];
            x[repoIndex].commit_history = res;

            setRepoList(x);
          }}
          className="show_commits_btn"
        >
          Show commits
        </code>
      )}

      {data.commit_history !== null && (
        <div style={{padding: '15px'}}>
          <code
            style={{
              textDecoration: "underline",
              display: "block",
              marginBottom: "25px",
              color: "lightgray",
            }}
          >
            Showing {data.commit_history.length} of the latest commits
          </code>
          {data.commit_history.map((x: commit_details, index: number) => {
            return (
              <div key={index}>
                <code style={{ color: "lightgray" }}>
                  commit ID -{" "}
                  <a href={x.html_url} target="_blank">
                    {x.sha}
                  </a>
                </code>

                <p>{x.message}</p>
              </div>
            );

          })}
          <code style={{cursor: 'pointer'}} onClick={() => {
            const x = [...currentRepoList]
            x[repoIndex].commit_history = null
            setRepoList(x)
          }}><a href={"#repo_div_" + repoIndex}><u>Close commits</u></a></code>
        </div>
      )}
    </div>
  );
}
