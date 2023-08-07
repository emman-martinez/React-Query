import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IssueItem } from "./IssueItem";
import fetchWithError from "../helpers/fetchWithError";

const fetchIssuesList = async (labels, status) => {
  const statusString = status ? `&status=${status}` : "";
  const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
  const res = await fetchWithError(
    `/api/issues?${labelsString}${statusString}`
  );

  return res;
};

const fetchIssuesSearch = async (searchValue) => {
  const res = await axios.get(`/api/search/issues?q=${searchValue}`);
  return res.data;
};

export default function IssuesList({ labels, status }) {
  const issuesQuery = useQuery(
    ["issues", { labels, status }],
    () => fetchIssuesList(labels, status),
    {
      staleTime: 1000 * 60,
    }
  );
  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useQuery(
    ["issues", "search", searchValue],
    () => fetchIssuesSearch(searchValue),
    {
      enabled: searchValue.length > 0,
    }
  );

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearchValue(event.target.elements.search.value);
        }}
      >
        <label htmlFor="search">Search Issues</label>
        <input
          id="search"
          name="search"
          onChange={(event) => {
            if (event.target.value.length === 0) {
              setSearchValue("");
            }
          }}
          placeholder="Search"
          type="search"
        />
      </form>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : issuesQuery.isError ? (
        <p>{issuesQuery.error.message}</p>
      ) : searchQuery.fetchStatus === "idle" && searchQuery.isLoading ? (
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
      ) : (
        <>
          <h2>Search Results</h2>
          {searchQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{searchQuery.data.count} Results</p>
              <ul className="issues-list">
                {searchQuery.data.items.map((issue) => (
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
            </>
          )}
        </>
      )}
    </div>
  );
}
