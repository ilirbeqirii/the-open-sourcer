/** @jsxImportSource @emotion/react */

import { Layout } from "antd";
import { AppHeader } from "./components/AppHeader";
import { AppSideMenu } from "./components/AppSideMenu";
import { AppFooter } from "./components/AppFooter";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import FullPageSpinner from "./components/lib/FullPageSpinner";
import { Content } from "antd/es/layout/layout";
import * as mq from "./styles/media-queries";

const RepositoriesScreen = lazy(() => import("./screens/Repositories"));
const ForkedRepositoriesScreen = lazy(
  () => import("./screens/ForkedRepositories")
);
const FavoritesScreen = lazy(() => import("./screens/Favorites"));
const UsersScreen = lazy(() => import("./screens/Users"));
const NotFoundScreen = lazy(() => import("./screens/NotFound"));
const UserSettingsScreen = lazy(() => import("./screens/UserSettings"));

function AuthenticatedApp() {
  return (
    <Layout
      hasSider
      css={{
        minHeight: "100svh",
        background: "var(--bg-clr)",
      }}
    >
      <AppSideMenu />

      <Layout
        css={{
          background: "var(--bg-clr)",
          [mq.lg]: {
            paddingInlineStart: "200px",
          },
        }}
      >
        <AppHeader />

        <Content css={{ flex: "2" }}>
          <Suspense fallback={<FullPageSpinner delay={1000} />}>
            <Routes>
              <Route path="/" element={<UsersScreen />} />
              <Route path="/repositories" element={<RepositoriesScreen />} />
              <Route
                path="/forked-repositories"
                element={<ForkedRepositoriesScreen />}
              />
              <Route path="/favorites" element={<FavoritesScreen />} />
              <Route path="/profile" element={<UserSettingsScreen />} />
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </Suspense>
        </Content>

        <AppFooter />
      </Layout>
    </Layout>
  );
}

export default AuthenticatedApp;
