import favoritesHandlers from "./favorites-handler";
import forkedRepositoryHandlers from "./forked-repo-handlers";
import githubUserHandlers from "./github-user.handlers";
import repositoryHandlers from "./repository-handlers";
import userHandlers from "./user-handlers";

export const handlers = [
  ...userHandlers,
  ...githubUserHandlers,
  ...repositoryHandlers,
  ...forkedRepositoryHandlers,
  ...favoritesHandlers
];
