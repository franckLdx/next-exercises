export interface UserInfo {
  name: string;
  bio: string;
}

export interface LicenseInfo {
  key: string;
  description: string;
}

export interface Language {
  name: string;
}

export interface Repository {
  name: string;
  description: string;
  licenseInfo: LicenseInfo;
  languages: Language[];
}
