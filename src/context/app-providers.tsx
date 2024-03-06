import { ConfigProvider } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth-context";

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Router>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "'Baloo 2', system-ui, sans-serif",
            },
            components: {
              Input: {
                activeShadow: "0px 0px 10px 1px #bebebe",
              },
              Modal: {
                headerBg: "#001529",
                footerBg: "#001529",
                contentBg: "#000",
                titleColor: "var(--accent-clr)",
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </Router>
    </AuthProvider>
  );
}

export default AppProviders;
