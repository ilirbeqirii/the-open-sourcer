/** @jsxImportSource @emotion/react */

import {
  HomeOutlined,
  NumberOutlined,
  PaperClipOutlined,
  TwitterCircleFilled,
} from "@ant-design/icons";
import { GithubUser } from "../api/models/github-user";
import { Tooltip } from "antd";

type GithubUserCardProps = {
  githubUser: GithubUser;
};

function GithubUserCard({ githubUser }: GithubUserCardProps) {
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
        opacity: 0.8,
        ":hover": {
          opacity: 1,
        },
      }}
    >
      <div css={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <img
          css={{ width: "60px", borderRadius: "50%" }}
          src={githubUser.avatar_url}
          alt={`${githubUser.name} profile picture`}
        />

        <h3>
          {githubUser.name} <br />
          <span css={{ color: "var(--accent-clr)" }}>@{githubUser.login}</span>
        </h3>

        {githubUser.location && (
          <span css={{ marginLeft: "auto" }}>
            <HomeOutlined />
            &nbsp; {githubUser.location}
          </span>
        )}
      </div>

      <pre css={{ whiteSpace: "break-spaces" }}>{githubUser.bio}</pre>

      <div
        css={{
          display: "flex",
          gap: "0.5rem",
          marginTop: "auto",
          flexWrap: "wrap",
        }}
      >
        {githubUser.twitter_username && (
          <span>
            <TwitterCircleFilled /> &nbsp;
            {githubUser.twitter_username}
          </span>
        )}

        {githubUser.blog && (
          <span>
            <PaperClipOutlined /> &nbsp;
            <a href={githubUser.blog}>{githubUser.blog}</a>
          </span>
        )}

        {githubUser.followers && (
          <Tooltip title="# of Followers">
            <span>
              <NumberOutlined />
              {githubUser.followers}
            </span>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export { GithubUserCard };
