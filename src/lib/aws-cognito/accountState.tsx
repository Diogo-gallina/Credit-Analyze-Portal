import React, { ReactNode } from 'react';
import AccountContext from '../../context/accountContext';
import userPool from './userPool';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession, ICognitoUserAttributeData } from 'amazon-cognito-identity-js';

interface AccountStateProps {
  children: ReactNode;
}

const AccountState: React.FC<AccountStateProps> = ({ children }) => {
  const signUp = async (name: string, email: string, document: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const attributeList: CognitoUserAttribute[] = [];

      const userName: ICognitoUserAttributeData = {
        Name: 'name',
        Value: name,
      };

      const userDocument: ICognitoUserAttributeData = {
        Name: 'custom:Document',
        Value: document,
      };

      const attributeName = new CognitoUserAttribute(userName);
      const attributeDocument = new CognitoUserAttribute(userDocument);

      attributeList.push(attributeName);
      attributeList.push(attributeDocument);

      userPool.signUp(email, password, attributeList, [], (err, result) => {
        if (err) {
          console.log('Error signing up:', err);
          reject(`Failed to register: ${err.message}`);
        } else {
          resolve(`Account created successfully! ${result}`);
        }
      });
    });
  };

  const authenticate = async(email: string, password: string): Promise<CognitoUserSession | void> => {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({ 
        Username: email, 
        Pool: userPool 
      });

      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log('Successfully authenticated!', result);
          resolve(result);
        },
        onFailure: (err) => {
          console.log('Error authenticating:', err);
          reject(`Failed to authenticate: ${err.message}`);
        },
        newPasswordRequired: (data) => {
          console.log('New password required: ' + data);
          resolve(data);
        }
      });
    });
  }

  return (
    <AccountContext.Provider value={{ signUp, authenticate }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountState;
