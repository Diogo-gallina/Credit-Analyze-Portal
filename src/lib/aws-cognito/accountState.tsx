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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err: Error, session: CognitoUserSession | null) => {
        if (!err && session) {
          setCurrentSession(session);
          setToken(session.getIdToken().getJwtToken());
        } else {
          console.error('Erro ao buscar sessão:', err);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const signOut = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      setCurrentSession(null);
      setToken(null);
    }
  };

  const setSession = (session: CognitoUserSession) => {
    setCurrentSession(session);
    setToken(session.getIdToken().getJwtToken());
  };

  return (
    <AccountContext.Provider
      value={{ 
        signUp, 
        authenticate, 
        confirmAccount, 
        resendConfirmationCode, 
        currentSession, 
        token, 
        signOut, 
        loading, 
        setSession 
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountState;
