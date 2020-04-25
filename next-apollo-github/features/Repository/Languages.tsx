import React from 'react';
import { Language, Languages } from './data';
import { ThemedBadges, ThemedBadge, ThemedBrick } from '../../components/Themed';

interface LanguagesProps {
  mainLanguage: Language | null;
  languages: Languages | null;
}

export const LanguageInfo: React.FC<LanguagesProps> = ({ mainLanguage, languages }) => {
  const mainLang = mainLanguage?.name;
  const langList = languages?.nodes
    .map(node => node.name)
    .filter(name => name !== mainLang);
  return <>
    {mainLang && <ThemedBadge text={mainLang} />}
    {langList && <ThemedBadges text={langList} />}
  </>;
}