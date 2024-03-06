/** @jsxImportSource @emotion/react */

import { Tooltip } from "antd";
import {
  BranchesOutlined,
  CodeOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { Repository } from "../api/models/repository";
import { Heart } from "./lib/Heart";

type FavoriteForkedRepoListProps = {
  repositories: Repository[];
  markForkedRepoUnFavorite: (id: number) => void;
};

function FavoriteForkedRepoList(props: FavoriteForkedRepoListProps) {
  const markAsUnfavorite = (id: number) => {
    props.markForkedRepoUnFavorite(id);
  };

  return (
    <div
      css={{
        display: "flex",
        gap: "1rem",
        paddingBlock: "10px",
        overflowX: "auto",
        "::-webkit-scrollbar": {
          height: "7px",
        },
        "::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#888",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
    >
      {props.repositories.map((repo, key) => (
        <div
          key={key}
          css={{
            minWidth: "200px",
            maxWidth: "200px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            border: "1px solid #30363d",
            borderRadius: "6px",
            backgroundColor: "rgb(22, 27, 34)",
            opacity: 0.8,
            ":hover": {
              opacity: 1,
            },
          }}
        >
          <CodeOutlined
            css={{
              width: "60px",
              borderRadius: "50%",
              fontSize: "3rem",
              alignSelf: "start",
            }}
          />

          <p css={{ flex: 2 }}>
            {repo.name} <br /> @{repo.full_name}
          </p>

          <div
            css={{
              display: "flex",
              gap: "1.5rem",
              marginTop: "auto",
              flexWrap: "wrap",
            }}
          >
            {repo.forks >= 0 && (
              <Tooltip title="# of Forks">
                <span>
                  <BranchesOutlined css={{ color: "var(--accent-clr)" }} />{" "}
                  {repo.forks}
                </span>
              </Tooltip>
            )}

            {repo.contributors >= 0 && (
              <Tooltip title="# of Contributors">
                <span>
                  <NumberOutlined css={{ color: "var(--clr-primary)" }} />
                  {repo.contributors}
                </span>
              </Tooltip>
            )}
          </div>

          <Heart isMarked={true} onClick={() => markAsUnfavorite(repo.id)} />
        </div>
      ))}
    </div>
  );
}

export { FavoriteForkedRepoList };
