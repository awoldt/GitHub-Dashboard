import repo_details from "../interfaces/repo_details";
import fetchCommitData from "../functions/fetchCommitData";
import commit_details from "../interfaces/commit_details";

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
          <h2 style={{ display: "inline", marginRight: "20px" }}>
            {data.name}
          </h2>
        </a>

        {data.language! && (
          <span style={{ fontWeight: "bold" }}>({data.language})</span>
        )}

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
        <button
          onClick={async () => {
            const res = await fetchCommitData(ownerName, data.name);

            const x: repo_details[] = [...currentRepoList];
            x[repoIndex].commit_history = res;

            setRepoList(x);
          }}
          className="show_commits_btn"
        >
          Show commits
        </button>
      )}

      {data.commit_history !== null && (
        <div>
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
          {data.commit_history.map((x: commit_details) => {
            return (
              <div>
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
        </div>
      )}
    </div>
  );
}
