import { createContext } from 'react';

const appSettings = {
  bgColor: '#B6C0C2',
  fgColorDetail: '#2E2929',
  fgColor: '#3E3E3E',
  textColor: '#FFFFFF',
  fontStyle: 'Gaegu',
  iconSizing: '5vw',
  iconSizingSmall: '3vw',

  appbarFontStyle: 'Annie Use Your Telescope',
  appbarFontSize: 'calc(10px + 2vmin)',

  softwareFontSize: 'calc(5px + 2vmin)',
  softwareMaintenanceFontSize: 'calc(2px + 2vmin)'
};

export const AppContext = createContext(appSettings);
