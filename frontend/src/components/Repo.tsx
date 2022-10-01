import repo_details from "../interfaces/repo_details";
import fetchCommitData from "../functions/fetchCommitData";
import commit_details from "../interfaces/commit_details"

export default function Repo({
  data,
  ownerName,
  repoIndex,
  currentRepoList,
  setRepoList,
}: {
  data: repo_details;
  ownerName: string;
  repoIndex: number;
  currentRepoList: repo_details[];
  setRepoList: React.Dispatch<React.SetStateAction<repo_details[] | undefined>>;
}) {
  console.log(data);
  return (
    <div className="repo_div">
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <button
        onClick={async () => {
          const res = await fetchCommitData(ownerName, data.name);
          console.log("res repoonse commit data");

          //construct new repolist
          const x: repo_details[] = [...currentRepoList];
          x[repoIndex].commit_history = res;

          console.log("SETTING REPO!");
          console.log(x);

          setRepoList(x);
        }}
      >
        Show commits
      </button>
      {data.commit_history !== null && <div>
        {data.commit_history.map((x: commit_details) => {
          return <div>

            <code>- {x.sha}</code>
            <p>{x.message}</p>
            </div>
        })}
        </div>}
    </div>
  );
}
