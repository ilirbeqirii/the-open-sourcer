/** @jsxImportSource @emotion/react */

import { Fragment, useEffect, useState } from "react";
import { useAsync } from "../hooks/use-async";
import * as githubUserService from "../data-access/github-users-service";
import { GithubUser } from "../api/models/github-user";
import FullPageSpinner from "../components/lib/FullPageSpinner";
import { ErrorAlert } from "../components/lib/ErrorAlert";
import { GithubUserCard } from "../components/GithubUserCard";
import Wrapper from "../components/lib/Wrapper";
import { NoResult } from "../components/lib/NoResult";
import { Search } from "../components/lib/Search";

function UsersScreen() {
  const {
    data: githubUsers,
    isError,
    isLoading,
    isQueried,
    error,
    run,
  } = useAsync<GithubUser[]>();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    run(githubUserService.getGithubUsers(searchTerm));
  }, [run, searchTerm]);

  const handleSearch = (query: string) => setSearchTerm(query);

  return (
    <Fragment>
      {isLoading ? <FullPageSpinner delay={100} /> : null}

      <Wrapper>
        <h1 css={{textAlign: "center"}}>Open Sourcers</h1>

        <h2 css={{ textAlign: "center" }}>
          Finding your favorite open sourcer has never been simpler!
          <br />
          Looking for someone specific?
        </h2>

        <Search handleSearch={handleSearch} />

        {isError && error ? (
          <ErrorAlert error={error} css={{ marginTop: "2rem" }} />
        ) : null}

        {githubUsers?.length ? (
          <div
            css={{
              marginTop: "2rem",
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            }}
          >
            {githubUsers.map((githubUser, index) => (
              <GithubUserCard githubUser={githubUser} key={index} />
            ))}
          </div>
        ) : isQueried && !isLoading ? (
          <NoResult query={searchTerm} />
        ) : null}
      </Wrapper>
    </Fragment>
  );
}

export default UsersScreen;
