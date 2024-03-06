export interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  html_url: string;
  name: string;
  blog: string;
  location: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  created_at: string;
  updated_at: string;
  forkedRepos: string[];
}
