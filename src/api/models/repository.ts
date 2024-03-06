export interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
}

export interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  languages: string[];
  contributors: number;
  created_at: string;
  updated_at: string;
  homepage: string | null;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  network_count: number;
  subscribers_count: number;
}
