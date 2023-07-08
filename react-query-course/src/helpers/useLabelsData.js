import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchLabels = async () => {
  const res = await axios.get("api/labels").then((res) => res.data);
  return res;
};

export function useLabelsData() {
  const labelsQuery = useQuery(["labels"], fetchLabels);
  return labelsQuery;
}
