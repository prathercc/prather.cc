import { createContext } from 'react';

const appSettings = {
  bgColor: '#b3b3ff',
  fgColorDetail: '#2E2929',
  fgColor: '#333333',
  textColor: '#FFFFFF',
  fontStyle: 'Titillium Web',
  iconSizing: '3vw',
  iconSizingSmall: '3vw',

  appbarFontStyle: 'Titillium Web',
  appbarFontSize: 'calc(5px + 2vmin)',

  tableHeaderFontSize: 'calc(3.5px + 2vmin)',
  tableNotesFontSize: 'calc(5px + 1vmin)',

  softwareFontSize: 'calc(1px + 2vmin)',
  softwareMaintenanceFontSize: 'calc(2px + 2vmin)',

  standardPageTitleFontSize: 'calc(5px + 2vmin)',
  standardCardTitleFontSize: 'calc(2px + 2vmin)'
};

export const AppContext = createContext(appSettings);
