export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  owner: {
    id?: any;
    login: string;
    avatar_url: string;
  };
}
