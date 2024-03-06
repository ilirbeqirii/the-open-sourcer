import { Favorites } from "../models/favorites";
import favoritesData from "./favorites.json";

let favorites: Favorites[] = [...favoritesData];

async function getFavorites(userId: string): Promise<Favorites | undefined> {
  return favorites.find((favorite) => favorite.userId == userId);
}

async function unMarkUserAsFavorite(id: number, loggedUserId: number) {
  const userFavorites = favorites.find(
    (favorite) => favorite.userId == String(loggedUserId)
  );

  if (!userFavorites) {
    throw new Error("No favorites found!");
  }

  const userToUnMarkIdx = userFavorites.favoriteGithubers.findIndex(
    (githubUserId) => githubUserId == String(id)
  );

  if (userToUnMarkIdx == -1) {
    throw new Error("No such github user marked as favorite is found!");
  }

  userFavorites.favoriteGithubers = userFavorites.favoriteGithubers.filter(
    (githubUserId) => githubUserId != String(id)
  );

  const idx = favorites.findIndex(
    (favorite) => favorite.userId == String(loggedUserId)
  );

  favorites[idx] = { ...userFavorites };
}

async function unMarkRepoAsFavorite(id: number, loggedUserId: number) {
  const userFavorites = favorites.find(
    (favorite) => favorite.userId == String(loggedUserId)
  );

  if (!userFavorites) {
    throw new Error("No favorites found!");
  }

  const repoToUnMarkIdx = userFavorites.favoriteRepositories.findIndex(
    (repoId) => repoId == String(id)
  );

  if (repoToUnMarkIdx == -1) {
    throw new Error("No such repo marked as favorite is found!");
  }

  userFavorites.favoriteRepositories =
    userFavorites.favoriteRepositories.filter((repoId) => repoId != String(id));

  const idx = favorites.findIndex(
    (favorite) => favorite.userId == String(loggedUserId)
  );

  favorites[idx] = { ...userFavorites };
}

async function unMarkForkedRepoAsFavorite(id: number, loggedUserId: number) {
  const userFavorites = favorites.find(
    (favorite) => favorite.userId == String(loggedUserId)
  );

  if (!userFavorites) {
    throw new Error("No favorites found!");
  }

  const repoToUnMarkIdx = userFavorites.favoriteForkedRepositories.findIndex(
    (repoId) => repoId == String(id)
  );

  if (repoToUnMarkIdx == -1) {
    throw new Error("No such forked repo marked as favorite is found!");
  }

  userFavorites.favoriteForkedRepositories =
    userFavorites.favoriteForkedRepositories.filter(
      (repoId) => repoId != String(id)
    );

  const idx = favorites.findIndex(
    (favorite) => favorite.userId == String(loggedUserId)
  );

  favorites[idx] = { ...userFavorites };
}

async function reset() {
  favorites = [...favoritesData];
}

export {
  getFavorites,
  reset,
  unMarkUserAsFavorite,
  unMarkRepoAsFavorite,
  unMarkForkedRepoAsFavorite,
};
