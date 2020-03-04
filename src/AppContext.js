import { createContext } from 'react';

const appSettings = {
  bgColor: '#B6C0C2',
  fgColorDetail: '#2E2929',
  fgColor: '#3E3E3E',
  textColor: '#CBCDEB',
  fontStyle: 'Tlwg Typist Bold Oblique'
};

export const AppContext = createContext(appSettings);
