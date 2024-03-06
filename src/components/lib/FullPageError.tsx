/** @jsxImportSource @emotion/react */

import { GithubOutlined } from "@ant-design/icons";

type ErrorProps = { error: Error };

function FullPageError({ error }: ErrorProps) {
  return (
    <div
      role="alert"
      css={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GithubOutlined css={{ fontSize: "7rem" }} />
      <h1 css={{ color: "#f78166" }}>
        Uh oh... There's a problem. Try refreshing the app.
      </h1>
      <pre css={{ color: "#ff4343" }}>{error.message}</pre>
    </div>
  );
}

export { FullPageError };
