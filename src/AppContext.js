import { createContext } from 'react';

const appSettings = {
  bgColor: '#B6C0C2',
  fgColorDetail: '#2E2929',
  fgColor: '#3E3E3E',
  textColor: '#FFFFFF',
  fontStyle: 'Gaegu',
  fontStyleAppBar: 'Annie Use Your Telescope'
};

export const AppContext = createContext(appSettings);
