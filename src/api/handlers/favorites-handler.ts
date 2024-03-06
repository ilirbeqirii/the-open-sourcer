import { HttpResponse, http } from "msw";
import { getToken } from "./user-handlers";

import { GithubUser } from "../models/github-user";
import { Repository } from "../models/repository";
import { FavoritesDTO } from "../models/favorites";

import * as favoritesDB from "../data/favorites.db";
import * as githubUsersDB from "../data/github-users.db";
import * as repositoriesDB from "../data/repositories.db";
import * as forkedRepositoriesDB from "../data/forked-repos.db";

const appUrl = import.meta.env.VITE_APP_URL;

const favoritesHandlers = [
  http.get(`${appUrl}/favorites`, async ({ request }) => {
    const token = getToken(request);
    if (!token) {
      throw new HttpResponse(null, {
        status: 401,
        statusText: "Cannot access the resource: make sure you login first!",
      });
    }

    let userId: string;
    try {
      userId = atob(token);
    } catch (error) {
      throw new HttpResponse(null, {
        statusText: "Invalid token. Please login again.",
        status: 401,
      });
    }

    const favorites = await favoritesDB.getFavorites(userId);

    if (!favorites) {
      return HttpResponse.json({
        users: [],
        repositories: [],
        forkedRepositories: [],
      } as FavoritesDTO);
    }

    const favGithubUsers: GithubUser[] = [];
    if (favorites.favoriteGithubers.length) {
      const favUserPromises = favorites.favoriteGithubers.map((userId) =>
        githubUsersDB.getById(Number(userId))
      );

      for await (const userData of favUserPromises) {
        if (userData) {
          favGithubUsers.push(userData);
        }
      }
    }

    const favRepositories: Repository[] = [];
    if (favorites.favoriteRepositories.length) {
      const favRepoPromises = favorites.favoriteRepositories.map((repoId) =>
        repositoriesDB.getById(Number(repoId))
      );

      for await (const repoData of favRepoPromises) {
        if (repoData) {
          favRepositories.push(repoData);
        }
      }
    }

    const favForkedRepositories: Repository[] = [];
    if (favorites.favoriteForkedRepositories.length) {
      const favForkedReposPromises = favorites.favoriteForkedRepositories.map(
        async (repoId) => forkedRepositoriesDB.getById(Number(repoId))
      );

      for await (const repoData of favForkedReposPromises) {
        if (repoData) {
          favForkedRepositories.push(repoData);
        }
      }
    }

    return HttpResponse.json({
      users: favGithubUsers,
      repositories: favRepositories,
      forkedRepositories: favForkedRepositories,
    } as FavoritesDTO);
  }),
  http.put(
    `${appUrl}/unmark-user-favorite/:id`,
    async ({ params, request }) => {
      const { id } = params;

      const token = getToken(request);
      if (!token) {
        throw new HttpResponse(null, {
          status: 401,
          statusText: "Cannot access the resource: make sure you login first!",
        });
      }

      let loggedUserId: string;
      try {
        loggedUserId = atob(token);
      } catch (error) {
        throw new HttpResponse(null, {
          statusText: "Invalid token. Please login again.",
          status: 401,
        });
      }

      await favoritesDB.unMarkUserAsFavorite(Number(id), Number(loggedUserId));

      return HttpResponse.json("");
    }
  ),
  http.put(
    `${appUrl}/unmark-repo-favorite/:id`,
    async ({ params, request }) => {
      const { id } = params;

      const token = getToken(request);
      if (!token) {
        throw new HttpResponse(null, {
          status: 401,
          statusText: "Cannot access the resource: make sure you login first!",
        });
      }

      let loggedUserId: string;
      try {
        loggedUserId = atob(token);
      } catch (error) {
        throw new HttpResponse(null, {
          statusText: "Invalid token. Please login again.",
          status: 401,
        });
      }

      await favoritesDB.unMarkRepoAsFavorite(Number(id), Number(loggedUserId));

      return HttpResponse.json("");
    }
  ),
  http.put(
    `${appUrl}/unmark-forked-repo-favorite/:id`,
    async ({ params, request }) => {
      const { id } = params;

      const token = getToken(request);
      if (!token) {
        throw new HttpResponse(null, {
          status: 401,
          statusText: "Cannot access the resource: make sure you login first!",
        });
      }

      let loggedUserId: string;
      try {
        loggedUserId = atob(token);
      } catch (error) {
        throw new HttpResponse(null, {
          statusText: "Invalid token. Please login again.",
          status: 401,
        });
      }

      await favoritesDB.unMarkForkedRepoAsFavorite(
        Number(id),
        Number(loggedUserId)
      );

      return HttpResponse.json("");
    }
  ),
];

export default favoritesHandlers;
