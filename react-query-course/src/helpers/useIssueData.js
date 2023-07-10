import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchIssueDetail = async (issueNumber) => {
  const res = await axios.get(`/api/issues/${issueNumber}`);
  return res.data;
};
export function useIssueData(issueNumber) {
  const issueDetailQuery = useQuery(["issues", issueNumber], () =>
    fetchIssueDetail(issueNumber)
  );

  return issueDetailQuery;
}
