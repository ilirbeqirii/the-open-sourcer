import * as authService from "./auth-service";

export type Config = {
  method?: string;
  body?: string | undefined;
  token?: string;
  headers?: HeadersInit | undefined;
};

async function httpClient(
  endpoint: string,
  {
    method,
    body,
    token,
    headers: customHeaders,
    ...customConfig
  }: Config = {} as Config
) {
  let config: Omit<Config, "token"> = {
    method: method ? method : body ? method : "GET",
    body: body ? JSON.stringify(body) : undefined,
  };

  if (token) {
    config.headers = { Authorization: `Bearer ${token}`, ...customHeaders };
  }

  if (body) {
    config.headers = { ...config.headers, "Content-Type": `application/json`, ...customHeaders };
  }

  config.headers = { ...config.headers, ...customHeaders };
  config = { ...config, ...customConfig };

  const response = await fetch(`${endpoint}`, config);

  if (response.status == 401) {
    await authService.logout();
    window.location.reload();
    return Promise.reject({ message: "Please re-authenticate." });
  }

  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
}

export const interceptedHttpClient = async (
  endpoint: string,
  config: Config
) => {
  const token = await authService.getToken();

  if (token) {
    return httpClient(endpoint, { ...config, token });
  }

  throw new Error(
    "Token Missing: interceptedClient must be provided the access token!"
  );
};

export default httpClient;
