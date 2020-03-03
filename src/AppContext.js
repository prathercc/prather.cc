import { createContext } from 'react';

const appSettings = {
  bgColor: '#B6C0C2',
  fgColorDetail: '#2E2929',
  fgColor: '#494949',
  textColor: '#CBCDEB',
  fontStyle: 'Tlwg Typist Bold Oblique'
};

export const AppContext = createContext(appSettings);
