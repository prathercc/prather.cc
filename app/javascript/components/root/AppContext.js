import { createContext } from 'react';

const appSettings = {
  bgColor: '#1a1a1a',
  fgColorDetail: 'rgb(79, 201, 201, 0.1)',
  fgColor: 'rgb(79, 201, 201, 0.1)',
  fontStyle: 'Titillium Web',
  standardTitleFontSize: 'calc(1px + 2vmin)',
  standardBodyFontSize: 'calc(2px + 1.75vmin)',
  standardSmallFontSize: 'calc(2px + 1.6vmin)'
};

export const AppContext = createContext(appSettings);
