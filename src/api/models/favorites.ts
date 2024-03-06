import { GithubUser } from "./github-user";
import { Repository } from "./repository";

export interface Favorites {
  userId: string;
  favoriteGithubers: string[];
  favoriteRepositories: string[];
  favoriteForkedRepositories: string[];
}

export interface FavoritesDTO {
  users: GithubUser[];
  repositories: Repository[];
  forkedRepositories: Repository[];
}
