import { useParams } from "react-router-dom";
import { IssueHeader } from "./IssueHeader.jsx";
import { Comment } from "./Comment.jsx";
import { useIssueData } from "../helpers/useIssueData.js";
import { useIssueComments } from "../helpers/useIssueComments.js";

export default function IssueDetails() {
  const { number } = useParams();
  const issueQuery = useIssueData(number);
  const commentsQuery = useIssueComments(number);

  return (
    <div className="issue-details">
      {issueQuery.isLoading ? (
        <div>Loading issue...</div>
      ) : (
        <>
          <IssueHeader {...issueQuery.data} />
          <main>
            <section>
              {commentsQuery.isLoading ? (
                <p>Loading...</p>
              ) : (
                commentsQuery.data?.map((comment) => (
                  <Comment key={comment.id} {...comment} />
                ))
              )}
            </section>
            <aside></aside>
          </main>
        </>
      )}
    </div>
  );
}
