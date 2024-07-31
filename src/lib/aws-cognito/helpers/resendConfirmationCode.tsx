import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '../userPool';

export const resendConfirmationCode = async (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.log('Error resending confirmation code:', err);
        reject(`Failed to resend confirmation code: ${err.message}`);
      } else {
        console.log('Successfully resent confirmation code!', result);
        resolve();
      }
    });
  });
};
