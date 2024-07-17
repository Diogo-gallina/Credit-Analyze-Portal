import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { createContext } from 'react';

interface AccountContextType {
  signUp: (name: string, email: string, document: string, password: string) => Promise<string>;
  authenticate: (email: string, password: string) => Promise<CognitoUserSession | void>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export default AccountContext;
