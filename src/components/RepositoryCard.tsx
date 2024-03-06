/** @jsxImportSource @emotion/react */

import {
  BranchesOutlined,
  CodeOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  NumberOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { Repository } from "../api/models/repository";
import { capitalize } from "../utils/misc";

type RepositoryCardProps = {
  repository: Repository;
};

function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <div
      css={{
        padding: "1rem",
        border: "1px solid #30363d",
        borderRadius: "6px",
        backgroundColor: "rgb(22, 27, 34)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        opacity: 0.8,
        ":hover": {
          opacity: 1,
        },
      }}
    >
      <div css={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <CodeOutlined
          css={{ width: "60px", borderRadius: "50%", fontSize: "3rem", alignSelf: "start" }}
        />

        <h3 css={{margin: 0}}>
          {repository.name} <br />
          <span css={{ color: "var(--accent-clr)" }}>
            @{repository.full_name}
          </span>
        </h3>

        {repository.visibility && (
          <span css={{ marginLeft: "auto" }}>
            {repository.visibility ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            &nbsp; {capitalize(repository.visibility)}
          </span>
        )}
      </div>

      <pre css={{ whiteSpace: "break-spaces", flex: "2" }}>
        {repository.description}
      </pre>

      {repository.languages && (
        <div
          css={{
            width: "fit-content",
            background: "linear-gradient(45deg, red, blue)",
            backgroundClip: "text",
            color: "transparent",
            fontWeight: "800",
            fontSize: "1rem",
            marginTop: "auto",
          }}
        >
          {repository.languages.join(", ")}
        </div>
      )}

      <div
        css={{
          display: "flex",
          gap: "1.5rem",
          marginTop: "auto",
          flexWrap: "wrap",
        }}
      >
        {repository.watchers >= 0 && (
          <Tooltip title="# of Stars">
            <span>
              <StarFilled css={{ color: "yellow" }} /> &nbsp;
              {repository.watchers}
            </span>
          </Tooltip>
        )}

        {repository.forks >= 0 && (
          <Tooltip title="# of Forks">
            <span>
              <BranchesOutlined css={{ color: "var(--accent-clr)" }} />{" "}
              {repository.forks}
            </span>
          </Tooltip>
        )}

        {repository.contributors >= 0 && (
          <Tooltip title="# of Contributors">
            <span>
              <NumberOutlined css={{ color: "var(--clr-primary)" }} />
              {repository.contributors}
            </span>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export { RepositoryCard };
