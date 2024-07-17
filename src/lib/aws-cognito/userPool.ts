import { CognitoUserPool, ICognitoUserPoolData } from "amazon-cognito-identity-js";

const poolData: ICognitoUserPoolData = {
    UserPoolId: process.env.POOL_ID as string,
	ClientId: process.env.APP_CLIENT_ID as string
}

export default new CognitoUserPool(poolData);