/** @jsxImportSource @emotion/react */

import { Fragment, useEffect, useState } from "react";
import { Repository } from "../api/models/repository";
import { useAsync } from "../hooks/use-async";
import * as repositoryService from "../data-access/repository-service";
import FullPageSpinner from "../components/lib/FullPageSpinner";
import Wrapper from "../components/lib/Wrapper";
import { Search } from "../components/lib/Search";
import { ErrorAlert } from "../components/lib/ErrorAlert";
import { NoResult } from "../components/lib/NoResult";
import { RepositoryCard } from "../components/RepositoryCard";

function RepositoriesScreen() {
  const {
    data: repositories,
    isError,
    isQueried,
    isLoading,
    error,
    run,
  } = useAsync<Repository[]>();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    run(repositoryService.getRepos(searchTerm));
  }, [run, searchTerm]);

  const handleSearch = (query: string) => setSearchTerm(query);

  return (
    <Fragment>
      {isLoading ? <FullPageSpinner delay={100} /> : null}

      <Wrapper>
        <h1 css={{textAlign: "center"}}>Repositories</h1>

        <h2 css={{ textAlign: "center" }}>
          Finding your next repo to start contributing has never been simpler!
          <br />
          Looking for something specific?
        </h2>

        <Search handleSearch={handleSearch} />

        {isError && error ? (
          <ErrorAlert error={error} css={{ marginTop: "2rem" }} />
        ) : null}

        {repositories?.length ? (
          <div
            css={{
              marginTop: "2rem",
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            }}
          >
            {repositories.map((repo, index) => (
              <RepositoryCard repository={repo} key={index} />
            ))}
          </div>
        ) : isQueried && !isLoading ? (
          <NoResult query={searchTerm} />
        ) : null}
      </Wrapper>
    </Fragment>
  );
}

export default RepositoriesScreen;
