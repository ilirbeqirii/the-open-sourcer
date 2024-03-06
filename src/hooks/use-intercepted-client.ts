import { useCallback } from "react";
import { useAuth } from "./use-auth";
import httpClient, { Config } from "../data-access/http-client";

function useInterceptedClient() {
  const { user } = useAuth();
  const token = user?.token;

  return useCallback(
    (endpoint: string, config: Config) =>
      httpClient(endpoint, { ...config, token }),
    [token]
  );
}

export {useInterceptedClient}