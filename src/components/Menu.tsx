/** @jsxImportSource @emotion/react */

import { SettingOutlined } from "@ant-design/icons";
import { items } from "../constants/sidemenu-items";
import { NavLink } from "react-router-dom";

const selectedItemStyles = {
  color: "var(--accent-clr)",
  backgroundColor: "#183047",
  opacity: 1,
};

const hoverItemStyles = {
  opacity: 1,
  backgroundColor: "#122435",
  color: "#fff",
};

function Menu() {
  return (
    <div
      css={{
        display: "flex",
        gap: "5px",
        flexDirection: "column",
        padding: "10px",
        marginBlock: "1rem",
        flex: "2",
      }}
    >
      {items.map((item) => (
        <NavLink
          to={item.path}
          css={{
            display: "flex",
            gap: "0.5rem",
            cursor: "pointer",
            color: "#fff",
            borderRadius: "5px",
            padding: "10px 15px",
            opacity: "0.7",
            transition: "all 0.3s",
            ":hover": { ...hoverItemStyles },
          }}
          key={item.key}
          style={({ isActive }) => {
            return isActive ? selectedItemStyles : {};
          }}
        >
          {item.icon}{" "}
          <span css={{ display: "inline-block" }}>{item.label}</span>
        </NavLink>
      ))}

      <NavLink
        to="/profile"
        css={{
          display: "flex",
          gap: "0.5rem",
          marginTop: "auto",
          cursor: "pointer",
          color: "#fff",
          borderRadius: "5px",
          padding: "10px 15px",
          opacity: "0.7",
          transition: "all 0.3s",
          ":hover": { ...hoverItemStyles },
        }}
        key={5}
        style={({ isActive }) => {
          return isActive ? selectedItemStyles : {};
        }}
      >
        <SettingOutlined />{" "}
        <span css={{ display: "inline-block" }}>Profile</span>
      </NavLink>
    </div>
  );
}

export { Menu };
