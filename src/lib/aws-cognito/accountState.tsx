import React, { ReactNode, useEffect, useState } from 'react';
import { signUp, authenticate, confirmAccount, resendConfirmationCode } from './helpers';
import AccountContext from '../../context/AccountContext';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import userPool from './userPool';

interface AccountStateProps {
  children: ReactNode;
}

const AccountState: React.FC<AccountStateProps> = ({ children }) => {
  const [currentSession, setCurrentSession] = useState<CognitoUserSession | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err: Error , session: CognitoUserSession | null) =>  {
    if (!err && session) {
      setCurrentSession(session);
      setToken(session.getIdToken().getJwtToken());
    } else {
      console.error('Erro ao buscar sessão:', err);
    }
  });
}
}, []);

  return (
    <AccountContext.Provider
      value={{ signUp, authenticate, confirmAccount, resendConfirmationCode, currentSession, token }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountState;