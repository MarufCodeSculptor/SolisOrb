import { createContext } from 'react';

export const CredContext = createContext(null);

// eslint-disable-next-line react/prop-types
const CredProvider = ({ children }) => {
  const credValues = {
    name: 'selina akhter munni',
    roll: 3,
    class: 'nine',
    'marital-status': 'unmarried',
  };
  return (
    <CredContext.Provider value={credValues}>{children}</CredContext.Provider>
  );
};

export default CredProvider;
