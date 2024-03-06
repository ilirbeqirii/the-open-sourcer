import { Repository } from "../api/models/repository";
import { interceptedHttpClient } from "./http-client";

const appUrl = import.meta.env.VITE_APP_URL;

async function getRepos(query: string): Promise<Repository[]> {
  return interceptedHttpClient(
    `${appUrl}/repos?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
    }
  );
}

async function getRepoById(id: number): Promise<Repository> {
  return interceptedHttpClient(`${appUrl}/repos/${id}}`, {
    method: "GET",
  });
}

export { getRepos, getRepoById };
