import { createContext } from 'react';

const appSettings = {
  bgColor: '#666666',
  fgColorDetail: '#282B5A',
  fgColor: '#313467',
  textColor: '#CBCDEB',
  fontStyle: 'Tlwg Typist Bold Oblique'
};

export const AppContext = createContext(appSettings);
