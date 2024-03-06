/** @jsxImportSource @emotion/react */

import { TwitterCircleFilled } from "@ant-design/icons";
import { GithubUser } from "../api/models/github-user";
import { Heart } from "./lib/Heart";

type FavoriteUsersProps = {
  users: GithubUser[];
  markUserUnFavorite: (id: number) => void;
};

function FavoriteUsers(props: FavoriteUsersProps) {
  const markAsUnfavorite = (id: number) => {
    props.markUserUnFavorite(id);
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
      {props.users.map((user, key) => (
        <div
          key={key}
          css={{
            minWidth: "180px",
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
          <img
            src={user.avatar_url}
            alt={`${user.name} avatar`}
            css={{
              width: "80px",
              borderRadius: "50%",
              alignSelf: "center",
            }}
          />
          <p>
            {user.name} <br /> @{user.login}
          </p>

          {user.twitter_username && (
            <span>
              <TwitterCircleFilled css={{ color: "deepskyblue" }} /> &nbsp;
              {user.twitter_username}
            </span>
          )}

          <Heart isMarked={true} onClick={() => markAsUnfavorite(user.id)} />
        </div>
      ))}
    </div>
  );
}

export { FavoriteUsers };
