import { createContext } from 'react';

const appSettings = {
  bgColor: '#1a1a1a',
  fgColorDetail: 'rgb(79, 201, 201, 0.1)',
  fgColor: 'rgb(79, 201, 201, 0.1)',
  textColor: '#FFFFFF',
  fontStyle: 'Titillium Web',
  iconSizing: '3vw',
  iconSizingSmall: '3vw',

  appbarFontSize: 'calc(5px + 2vmin)',

  tableHeaderFontSize: 'calc(3.5px + 2vmin)',
  tableNotesFontSize: 'calc(5px + 1vmin)',

  softwareFontSize: 'calc(1px + 2vmin)',
  softwareMaintenanceFontSize: 'calc(0.5px + 2vmin)',

  standardPageTitleFontSize: 'calc(5px + 2vmin)',
  standardCardTitleFontSize: 'calc(3px + 2vmin)'
};

export const AppContext = createContext(appSettings);
