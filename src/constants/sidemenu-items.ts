import {
  BranchesOutlined,
  ForkOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

export type MenuItem = {
  key: number;
  icon: React.ReactNode;
  label: string;
  path: string;
};

const usersMenu: MenuItem = {
  key: 1,
  icon: React.createElement(UserOutlined),
  label: `Users`,
  path: "/",
};

const repositoriesMenu: MenuItem = {
  key: 2,
  icon: React.createElement(BranchesOutlined),
  label: `Repositories`,
  path: "repositories",
};

const forkedReposMenu: MenuItem = {
  key: 3,
  icon: React.createElement(ForkOutlined),
  label: `Forked Repositories`,
  path: "forked-repositories",
};

const favoritesMenu: MenuItem = {
  key: 4,
  icon: React.createElement(StarOutlined),
  label: `Favorites`,
  path: "favorites",
};

const items = [usersMenu, repositoriesMenu, forkedReposMenu, favoritesMenu];

export { items };
