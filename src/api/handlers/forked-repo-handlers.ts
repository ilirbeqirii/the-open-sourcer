import { HttpResponse, http } from "msw";
import * as forkedRepositoriesDB from "../data/forked-repos.db";

const appUrl = import.meta.env.VITE_APP_URL;

const forkedRepositoryHandlers = [
  http.get(`${appUrl}/forked-repos`, async ({ request }) => {
    const parsedUrl = new URL(request.url);
    const query = parsedUrl.searchParams.get("query") ?? "";

    const repositories = await forkedRepositoriesDB.getAll(query);
    return HttpResponse.json(repositories);
  }),
  http.get(`${appUrl}/forked-repos/:id`, async ({ params }) => {
    const { id } = params;

    const repository = await forkedRepositoriesDB.getById(Number(id));
    if (!repository) {
      throw new Error("No repository found with id: " + id);
    }

    return HttpResponse.json(repository);
  }),
];

export default forkedRepositoryHandlers;
