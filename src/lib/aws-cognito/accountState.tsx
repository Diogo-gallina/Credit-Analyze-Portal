import React, { ReactNode } from 'react';
import { signUp, authenticate, confirmAccount, resendConfirmationCode } from './helpers';
import AccountContext from '../../context/accountContext';

interface AccountStateProps {
  children: ReactNode;
}

const AccountState: React.FC<AccountStateProps> = ({ children }) => {
  return (
    <AccountContext.Provider
      value={{ signUp, authenticate, confirmAccount, resendConfirmationCode }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountState;