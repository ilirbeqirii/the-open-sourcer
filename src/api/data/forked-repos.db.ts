import { matchSorter } from "match-sorter";
import respositoriesData from "./forked-repos.json";
import { Repository } from "../models/repository";

let repositories: Repository[] = [...respositoriesData];

async function getAll(query: string): Promise<Repository[]> {
  return matchSorter(repositories, query, {
    keys: [
      "full_name",
      "name",
      { threshold: matchSorter.rankings.CONTAINS, key: "description" },
    ],
  });
}

async function getById(id: number): Promise<Repository | undefined> {
  return repositories.find((repo) => repo.id == id);
}

async function reset() {
  repositories = [...respositoriesData];
}



export { reset, getById, getAll };
