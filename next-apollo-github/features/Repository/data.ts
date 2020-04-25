export interface Repository {
  name: string;
  description: string;
  licenseInfo: LicenseInfo | null;
  primaryLanguage: Language | null;
  languages: Languages | null;
}
export interface Languages {
  nodes: Language[]
}

export interface Language {
  name: string;
}

export interface LicenseInfo {
  body: string;
}