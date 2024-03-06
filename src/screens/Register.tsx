/** @jsxImportSource @emotion/react */

import { RegisterForm } from "../components/RegisterForm";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { RegisterModel } from "../api/models/register";

function RegisterScreen() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (registerInfo: RegisterModel) => {
    return register(registerInfo).then(() => {
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
      <h1 css={{ marginTop: "0", textAlign: "center" }}>Register</h1>

      <RegisterForm onSubmit={handleRegister} />

      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          marginTop: "1rem",
        }}
      >
        <span>Already have an account? </span>

        <NavLink
          to="/login"
          css={{
            color: "#f78166",
            textAlign: "center",
            cursor: "pointer",
            textDecoration: "none",
            paddingInline: "10px",
            ":hover": {
              color: "#f78166ad !important",
            },
          }}
        >
          Login
        </NavLink>
      </div>
    </div>
  );
}

export { RegisterScreen };
