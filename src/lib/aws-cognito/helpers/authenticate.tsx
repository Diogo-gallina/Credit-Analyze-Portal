import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import userPool from '../userPool';

export const authenticate = async (
  email: string,
  password: string,
): Promise<CognitoUserSession | void> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
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
      },
    });
  });
};
