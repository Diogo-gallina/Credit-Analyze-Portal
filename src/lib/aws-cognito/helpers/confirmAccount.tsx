import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '../userPool';

export const confirmAccount = async (email: string, code: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.log('Error confirming account:', err);
        reject(`Failed to confirm account: ${err.message}`);
      } else {
        console.log('Successfully confirmed account!', result);
        resolve();
      }
    });
  });
};
