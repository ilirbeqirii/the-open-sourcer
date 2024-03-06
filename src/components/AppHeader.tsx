/** @jsxImportSource @emotion/react */

import { Header } from "antd/es/layout/layout";
import { useAuth } from "../hooks/use-auth";
import { MoonOutlined } from "@ant-design/icons";
import { AppButton } from "./forms/lib";
import { useNavigate } from "react-router-dom";

function AppHeader() {
  const { user } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      navigate("/login");
    });
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
      css={{
        color: "#fff",
        background: "linear-gradient(to left,#001529 60%, transparent)",
        display: "flex",
      }}
    >
      {user && (
        <div
          css={{
            marginLeft: "auto",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppButton
            style={{
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            icon={<MoonOutlined css={{ fontSize: "1.2rem !important" }} />}
          />
          <div css={{ display: "flex" }}>
            <span
              css={{
                borderRadius: "50%",
                padding: "10px",
                border: "4px solid #fff",
                width: "40px",
                height: "40px",
                alignSelf: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.1rem",
                borderStyle: "double",
                borderColor: "var(--accent-clr)",
                color: "var(--accent-clr)",
              }}
            >
              {user.username.toUpperCase().slice(0, 2)}
            </span>

            <AppButton
              css={{
                alignSelf: "center",
                border: "none",
                paddingInline: "8px",
              }}
              onClick={handleLogout}
            >
              Logout
            </AppButton>
          </div>
        </div>
      )}
    </Header>
  );
}

export { AppHeader };
