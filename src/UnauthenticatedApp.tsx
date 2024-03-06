/** @jsxImportSource @emotion/react */

import { Route, Routes } from "react-router-dom";
import appLogo from "./assets/github-logo.svg";
import { LoginScreen } from "./screens/Login";
import { RegisterScreen } from "./screens/Register";

function UnAuthenticatedApp() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100svh",
        placeContent: "center",
        margin: "0 auto",
        maxWidth: "23rem",
        gap: "1rem",
      }}
    >
      <img
        src={appLogo}
        alt="The Githuber Logo"
        css={{ width: "115px", aspectRatio: "1", alignSelf: "center" }}
      />

      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </div>
  );
}

export default UnAuthenticatedApp;
