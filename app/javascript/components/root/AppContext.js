import { createContext } from 'react';

const appSettings = {
  bgColor: '#1a1a1a',
  fgColorDetail: 'rgb(79, 201, 201, 0.1)',
  fgColor: 'rgb(79, 201, 201, 0.1)',
  fontStyle: 'Titillium Web',
  standardTitleFontSize: 'calc(3px + 2vmin)',
  standardBodyFontSize: 'calc(1px + 2vmin)',
  standardSmallFontSize: 'calc(1px + 1.75vmin)'
};

export const AppContext = createContext(appSettings);
