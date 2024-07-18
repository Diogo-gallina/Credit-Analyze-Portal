import {
  CognitoUserPool,
  ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';

const poolData: ICognitoUserPoolData = {
  UserPoolId: import.meta.env.VITE_POOL_ID,
  ClientId: import.meta.env.VITE_APP_CLIENT_ID,
};

export default new CognitoUserPool(poolData);
