export interface UserInfo {
  name: string;
  bio: string | null;
}

export interface Language {
  name: string;
}

export interface Repository {
  name: string;
  description: string;
  owner: RepositoryOwner;
}

export interface RepositoryOwner {
  login: string;
}