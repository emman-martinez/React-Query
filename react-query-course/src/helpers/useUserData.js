import { useQuery } from "@tanstack/react-query";

const fetchUsers = async ({ queryKey }) => {
  const [users, userId] = queryKey;
  const res = await fetch(`api/users/${userId}`);
  return res.json();
};
export function useUserData(userId) {
  const usersData = useQuery(["users", userId], fetchUsers);
  return usersData;
}
