import { Footer } from "antd/es/layout/layout";

function AppFooter() {
  return (
    <Footer
      style={{
        textAlign: "center",
        color: "var(--accent-clr)",
        background: "var(--bg-clr)",
        borderTop: "1px solid #30363d"
      }}
    >
      ©{new Date().getFullYear()} Created by @lilbeqiri
    </Footer>
  );
}

export { AppFooter };
