import { DefaultBodyType, HttpResponse, http, StrictRequest } from "msw";
import { AuthModel } from "../models/login";
import * as usersDB from "../data/users.db";
import { RegisterModel } from "../models/register";
import { User } from "../models/user";
import { EditUserFormFields } from "../../components/forms/models";

const authUrl = import.meta.env.VITE_AUTH_URL;

const userHandlers = [
  http.post(`${authUrl}/login`, async ({ request }) => {
    const authInfo: string = (await request.json()) as string;
    const loginInfo: AuthModel = JSON.parse(authInfo) as AuthModel;

    const user = await usersDB.authenticate(loginInfo);
    return HttpResponse.json({ user });
  }),
  http.post(`${authUrl}/register`, async ({ request }) => {
    const registerInfoStr = (await request.json()) as string;
    const registerInfo = JSON.parse(registerInfoStr) as RegisterModel;
    await usersDB.create(registerInfo);

    let user: User;
    try {
      user = await usersDB.authenticate(registerInfo);
    } catch (error) {
      return new HttpResponse(null, {
        status: 400,
        statusText: (error as Error).message,
      });
    }

    return HttpResponse.json({ user });
  }),
  http.get(`${authUrl}/me`, async ({ request }) => {
    const token = getToken(request);
    if (!token) {
      throw new HttpResponse(null, {
        status: 401,
        statusText: "A token must be provided",
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

    const user = await usersDB.getUser(userId);
    return HttpResponse.json({ user: { ...user, token } });
  }),
  http.get(`${authUrl}/profile`, async ({ request }) => {
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

    const user = await usersDB.getProfile(userId);
    return HttpResponse.json(user);
  }),
  http.put(`${authUrl}/profile`, async ({ request }) => {
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

    const info = (await request.json()) as string;
    const infoParsed = JSON.parse(info) as EditUserFormFields;

    const updatedUser = await usersDB.updateProfile(userId, infoParsed);
    return HttpResponse.json(updatedUser);
  }),
];

export const getToken = (request: StrictRequest<DefaultBodyType>) =>
  request.headers.get("Authorization")?.replace("Bearer ", "");

export default userHandlers;
