import { useUserData } from "../helpers/useUserData.js";
import { relativeDate } from "../helpers/relativeDate.js";

export function Comment({ comment, createdBy, createdDate }) {
  const userQuery = useUserData(createdBy);

  if (userQuery.isLoading)
    return (
      <div className="comment">
        <div>
          <div className="comment-header">Loading...</div>
        </div>
      </div>
    );

  return (
    <div className="comment">
      <img alt="Commenter Avatar" src={userQuery.data.profilePictureUrl} />
      <div>
        <div className="comment-header">
          <span>{userQuery.data.name}</span> commented{" "}
          <span>{relativeDate(createdDate)}</span>
        </div>
        <div className="comment-body">{comment}</div>
      </div>
    </div>
  );
}
