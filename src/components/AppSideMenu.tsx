/** @jsxImportSource @emotion/react */

import Sider from "antd/es/layout/Sider";
import appLogo from "../assets/github-logo.svg";
import { Menu } from "./Menu";
import * as mq from "../styles/media-queries";

function AppSideMenu() {
  return (
    <Sider
      style={{ height: "100vh", position: "fixed", left: 0, top: 0, bottom: 0 }}
      css={{
        background: "#001529 !important",
        padding: "0.5rem 0 1rem  0",
        zIndex: "9999",
        [mq.lg]: {
          background:
            "linear-gradient(180deg,#001529, transparent 90%) !important",
        },
      }}
      className="sidemenu"
      breakpoint="lg"
      collapsedWidth="0"
      zeroWidthTriggerStyle={{ top: "12px" }}
    >
      <div
        css={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "end",
          justifyContent: "center",
          marginBlock: "0.5rem",
        }}
      >
        <img
          src={appLogo}
          alt="The Githuber Logo"
          css={{ width: "40px", aspectRatio: "1", alignSelf: "center" }}
        />
        <span css={{ fontSize: "1.2rem" }}>The Githuber</span>
      </div>

      <Menu />
    </Sider>
  );
}

export { AppSideMenu };
