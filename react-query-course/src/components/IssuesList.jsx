import { useQuery } from "@tanstack/react-query";
import { IssueItem } from "./IssueItem";
import axios from "axios";

const fetchIssuesList = async (labels, status) => {
  const statusString = status ? `&status=${status}` : "";
  const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
  const res = await axios.get(`/api/issues?${labelsString}${statusString}`);
  return res.data;
};

export default function IssuesList({ labels, status }) {
  const issuesQuery = useQuery(["issues", { labels, status }], () =>
    fetchIssuesList(labels, status)
  );

  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="issues-list">
          {issuesQuery.data.map((issue) => (
            <IssueItem
              key={issue.id}
              assignee={issue.assignee}
              commentCount={issue.comments.length}
              createdBy={issue.createdBy}
              createdDate={issue.createdDate}
              labels={issue.labels}
              number={issue.number}
              status={issue.status}
              title={issue.title}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
