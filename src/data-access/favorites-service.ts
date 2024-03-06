import { interceptedHttpClient } from "./http-client";

const appUrl = import.meta.env.VITE_APP_URL;

async function getFavorites() {
  return interceptedHttpClient(`${appUrl}/favorites`, {
    method: "GET",
  });
}

async function unMarkUserAsFavorite(id: number) {
  return interceptedHttpClient(`${appUrl}/unmark-user-favorite/${id}`, {
    method: "PUT",
  });
}

async function unMarkRepoAsFavorite(id: number) {
  return interceptedHttpClient(`${appUrl}/unmark-repo-favorite/${id}`, {
    method: "PUT",
  });
}

async function unMarkForkedRepoAsFavorite(id: number) {
  return interceptedHttpClient(`${appUrl}/unmark-forked-repo-favorite/${id}`, {
    method: "PUT",
  });
}

export {
  getFavorites,
  unMarkUserAsFavorite,
  unMarkRepoAsFavorite,
  unMarkForkedRepoAsFavorite,
};
