import { createContext } from 'react';

import { CognitoUserSession } from 'amazon-cognito-identity-js';

interface AccountContextType {
  signUp: (
    name: string,
    email: string,
    document: string,
    password: string,
  ) => Promise<string>;
  authenticate: (
    email: string,
    password: string,
  ) => Promise<CognitoUserSession | void>;
  confirmAccount: (email: string, code: string) => Promise<void>;
  resendConfirmationCode: (email: string) => Promise<void>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export default AccountContext;
