import React, { useContext } from 'react';
import { Box } from 'gestalt';
import { ThemeContext } from 'styled-components';

export interface LicenseInfo {
  key: string;
  description: string;
}

export interface Language {
  name: string;
}

export interface RepositoryBrickData {
  name: string;
  description: string;
  licenseInfo: LicenseInfo;
  languages: Language[];
}

export interface RepositoryBrickProps {
  data: RepositoryBrickData;
}

export const RepositoryBrick: React.FC<RepositoryBrickProps> = ({ data }) => {
  const theme = useContext(ThemeContext);
  return (
    <Box
      {...theme.box}
      paddingX={3}
      marginBottom={3}
      color="lightGray"
    >
      {data.name} < br />
      {data.description} < br />
      {data.licenseInfo?.key} < br />
      {data.licenseInfo?.description} < br />
    </Box >
  );
};
