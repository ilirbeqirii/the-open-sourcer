import { HttpResponse, http } from "msw";
import * as repositoriesDB from "../data/repositories.db";

const appUrl = import.meta.env.VITE_APP_URL;

const repositoryHandlers = [
  http.get(`${appUrl}/repos`, async ({ request }) => {
    const parsedUrl = new URL(request.url);
    const query = parsedUrl.searchParams.get("query") ?? "";

    const repositories = await repositoriesDB.getAll(query);
    return HttpResponse.json(repositories);
  }),
  http.get(`${appUrl}/repos/:id`, async ({ params }) => {
    const { id } = params;

    const repository = await repositoriesDB.getById(Number(id));
    if (!repository) {
      throw new Error("No repository found with id: " + id);
    }

    return HttpResponse.json(repository);
  }),
];

export default repositoryHandlers;
