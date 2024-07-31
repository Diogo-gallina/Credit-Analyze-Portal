import {
  CognitoUserAttribute,
  ICognitoUserAttributeData,
} from 'amazon-cognito-identity-js';
import userPool from '../userPool';

export const signUp = async (
  name: string,
  email: string,
  document: string,
  password: string,
): Promise<string> => {
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
