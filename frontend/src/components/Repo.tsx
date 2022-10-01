import repo_details from "../interfaces/repo_details";
import fetchCommitData from "../functions/fetchCommitData";

export default function Repo({
  data,
  ownerName,
}: {
  data: repo_details;
  ownerName: string;
}) {
  console.log(data);
  return (
    <div className="repo_div">
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <code
        onClick={async () => {
          const res = await fetchCommitData(ownerName, data.name);
          console.log(res);
          
        }}
      >
        Show commits
      </code>
    </div>
  );
}
