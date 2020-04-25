import { createContext } from 'react';

const appSettings = {
  bgColor: '#b3b3ff',
  fgColorDetail: '#2E2929',
  fgColor: '#3E3E3E',
  textColor: '#FFFFFF',
  fontStyle: 'Titillium Web',
  iconSizing: '5vw',
  iconSizingSmall: '3vw',

  appbarFontStyle: 'Titillium Web',
  appbarFontSize: 'calc(5px + 2vmin)',

  softwareFontSize: 'calc(1.5px + 2vmin)',
  softwareMaintenanceFontSize: 'calc(1.5px + 2vmin)'
};

export const AppContext = createContext(appSettings);
