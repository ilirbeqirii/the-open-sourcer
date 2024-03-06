import { HttpResponse, http } from "msw";
import * as githubUsersDB from "../data/github-users.db";

const appUrl = import.meta.env.VITE_APP_URL;

const githubUserHandlers = [
  http.get(`${appUrl}/users`, async ({ request }) => {
    const parsedUrl = new URL(request.url);
    const query = parsedUrl.searchParams.get("query") ?? "";

    const githubUsers = await githubUsersDB.getAll(query);
    return HttpResponse.json(githubUsers);
  }),
];

export default githubUserHandlers;
