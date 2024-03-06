import { GithubUser } from "../api/models/github-user";
import { interceptedHttpClient } from "./http-client";

const appUrl = import.meta.env.VITE_APP_URL;

async function getGithubUsers(searchTerm: string): Promise<GithubUser[]> {
  return interceptedHttpClient(
    `${appUrl}/users?query=${encodeURIComponent(searchTerm)}`,
    { method: "GET" }
  );
}

export { getGithubUsers };
