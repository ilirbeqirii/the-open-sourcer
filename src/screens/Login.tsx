/** @jsxImportSource @emotion/react */

import { Divider } from "antd";
import LoginForm from "../components/LoginForm";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { AuthModel } from "../api/models/login";

function LoginScreen() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (authInfo: AuthModel) => {
    return login(authInfo).then(() => {
      navigate("/");
    });
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem 1rem",
        boxShadow: "0px 0px 13px 0px rgb(123 123 123 / 75%)",
        borderRadius: "5px",
      }}
    >
      <h1 css={{ margin: "0", textAlign: "center" }}>Log In</h1>

      <Divider
        css={{
          borderColor: "#fff !important",
          margin: "0 0 24px 0",
          color: "inherit !important",
        }}
      >
        Welcome to your Githuber account!
      </Divider>

      <LoginForm onSubmit={handleLogin} />

      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <span>Don't have an account yet? </span>

        <NavLink
          to="/register"
          css={{
            color: "#f78166",
            textAlign: "center",
            cursor: "pointer",
            textDecoration: "none",
            ":hover": {
              color: "#f78166ad !important",
            },
          }}
        >
          Create Account
        </NavLink>
      </div>
    </div>
  );
}

export { LoginScreen };
