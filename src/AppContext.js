import { createContext } from 'react';

const appSettings = {
  bgColor: '#666666',
  fgColor: '#282B5A',
  fgColorDetail: '#313467',
  textColor: '#CBCDEB',
  fontStyle: 'Tlwg Typist Bold Oblique'
};

export const AppContext = createContext(appSettings);
