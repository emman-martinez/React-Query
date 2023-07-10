import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchIssueComments = async (issueNumber) => {
  const res = await axios.get(`/api/issues/${issueNumber}/comments`);
  return res.data;
};
export function useIssueComments(issueNumber) {
  const issueCommentsQuery = useQuery(["issues", issueNumber, "comments"], () =>
    fetchIssueComments(issueNumber)
  );

  return issueCommentsQuery;
}
