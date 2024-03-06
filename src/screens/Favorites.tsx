/** @jsxImportSource @emotion/react */

import { Fragment, useEffect, useState } from "react";
import FullPageSpinner from "../components/lib/FullPageSpinner";
import Wrapper from "../components/lib/Wrapper";
import { ErrorAlert } from "../components/lib/ErrorAlert";
import { useAsync } from "../hooks/use-async";
import { FavoritesDTO } from "../api/models/favorites";
import * as favoritesService from "../data-access/favorites-service";
import { FavoriteRepoList } from "../components/FavoriteRepoList";
import { FavoriteForkedRepoList } from "../components/FavoriteForkedRepoList";
import { FavoriteUsers } from "../components/FavoriteUserList";
import { Empty } from "antd";

function FavoritesScreen() {
  const {
    data: favorites,
    isError,
    isLoading,
    error,
    run,
  } = useAsync<FavoritesDTO>();
  const [status, setStatus] = useState<"UPDATED" | "IDLE" | "INIT">("INIT");

  useEffect(() => {
    if (status != "IDLE") {
      run(favoritesService.getFavorites());

      setStatus("IDLE");
    }
  }, [run, status]);

  const markUserUnFavorite = async (id: number) => {
    await favoritesService.unMarkUserAsFavorite(id);
    setStatus("UPDATED");
  };

  const markRepoUnFavorite = async (id: number) => {
    await favoritesService.unMarkRepoAsFavorite(id);
    setStatus("UPDATED");
  };

  const markForkedRepoUnFavorite = async (id: number) => {
    await favoritesService.unMarkForkedRepoAsFavorite(id);
    setStatus("UPDATED");
  };

  return (
    <Fragment>
      {isLoading ? <FullPageSpinner delay={100} /> : null}

      <Wrapper>
        {isError && error ? (
          <ErrorAlert error={error} css={{ marginTop: "2rem" }} />
        ) : null}

        <h1 css={{ textAlign: "center" }}>Favorites</h1>

        <h2 css={{ textAlign: "center" }}>
          Finding your starred users, repositories and forked repositories in
          one place!
        </h2>

        {favorites && favorites.users ? (
          <>
            <h2>Users</h2>
            {favorites.users.length ? (
              <FavoriteUsers
                users={favorites.users}
                markUserUnFavorite={markUserUnFavorite}
              />
            ) : (
              <Empty
                description={
                  <span css={{ color: "white" }}>No users found!</span>
                }
              />
            )}

            <br />

            <h2>Repositories</h2>
            {favorites.repositories.length ? (
              <FavoriteRepoList
                repositories={favorites.repositories}
                markRepoUnFavorite={markRepoUnFavorite}
              />
            ) : (
              <Empty
                description={
                  <span css={{ color: "white" }}>No repos found!</span>
                }
              />
            )}

            <br />

            <h2>Forked Repositories</h2>
            {favorites.forkedRepositories.length ? (
              <FavoriteForkedRepoList
                repositories={favorites.forkedRepositories}
                markForkedRepoUnFavorite={markForkedRepoUnFavorite}
              />
            ) : (
              <Empty
                description={
                  <span css={{ color: "white" }}>No repos found!</span>
                }
              />
            )}
          </>
        ) : null}
      </Wrapper>
    </Fragment>
  );
}

export default FavoritesScreen;
