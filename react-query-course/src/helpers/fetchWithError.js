import axios from "axios";

export default async function fetchWithError(url, options) {
  const response = await axios.get(url, options);

  if (response.status === 200) {
    const result = await response.data; // await response.json(); if using fetch

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  }

  throw new Error(`Error ${response.status}: ${response.statusText}`);
}
