import { createContext } from 'react';

interface AccountContextType {
  signUp: (name: string, email: string, document: string, password: string) => Promise<string>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export default AccountContext;
