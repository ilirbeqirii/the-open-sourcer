import { Repository } from "../api/models/repository";
import { interceptedHttpClient } from "./http-client";

const appUrl = import.meta.env.VITE_APP_URL;

async function getForkedRepos(query: string): Promise<Repository[]> {
  return interceptedHttpClient(
    `${appUrl}/forked-repos?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
    }
  );
}

async function getForkedRepoById(id: number): Promise<Repository> {
  return interceptedHttpClient(`${appUrl}/forked-repos/${id}}`, {
    method: "GET",
  });
}

export { getForkedRepos, getForkedRepoById };
