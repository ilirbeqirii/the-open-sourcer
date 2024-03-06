import { matchSorter } from "match-sorter";
import githubUsersData from "./github-users.json";
import { GithubUser } from "../models/github-user";

let githubUsers = [...githubUsersData];

async function getAll(searchTerm: string): Promise<GithubUser[]> {
  return matchSorter(githubUsers, searchTerm, {
    keys: [
      "login",
      "name",
      "twitter_username",
      { threshold: matchSorter.rankings.CONTAINS, key: "bio" },
    ],
  });
}

async function getById(id: number): Promise<GithubUser | undefined> {
  return githubUsers.find((user) => user.id == id);
}

async function reset() {
  githubUsers = [...githubUsersData];
}

export { getById, reset, getAll };
