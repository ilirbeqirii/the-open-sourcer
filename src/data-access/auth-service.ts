import { AuthModel } from "../api/models/login";
import { RegisterModel } from "../api/models/register";
import { UserInfo, UserResponse } from "../api/models/user";
import { EditUserFormFields } from "../components/forms/models";
import httpClient, { interceptedHttpClient } from "./http-client";

const authUrl = import.meta.env.VITE_AUTH_URL;

const localStorageKey: string = "__auth_provider_token__";

function handleUserResponse({ user }: UserResponse) {
  window.localStorage.setItem(localStorageKey, user.token);
  return user;
}

async function getToken() {
  return localStorage.getItem(localStorageKey);
}

async function login(authInfo: AuthModel) {
  return httpClient(`${authUrl}/login`, {
    method: "POST",
    body: JSON.stringify(authInfo),
  }).then(handleUserResponse);
}

async function register(registerInfo: RegisterModel) {
  return httpClient(`${authUrl}/register`, {
    method: "POST",
    body: JSON.stringify(registerInfo),
  }).then(handleUserResponse);
}

async function getUser(token: string) {
  return httpClient(`${authUrl}/me`, {
    method: "GET",
    token,
  });
}

async function getProfile(): Promise<UserInfo> {
  return interceptedHttpClient(`${authUrl}/profile`, {
    method: "GET",
  });
}

async function updateProfile(info: EditUserFormFields) {
  return interceptedHttpClient(`${authUrl}/profile`, {
    method: "PUT",
    body: JSON.stringify(info),
  });
}

async function logout() {
  localStorage.removeItem(localStorageKey);
}

export {
  getToken,
  login,
  register,
  logout,
  getUser,
  getProfile,
  updateProfile,
};
