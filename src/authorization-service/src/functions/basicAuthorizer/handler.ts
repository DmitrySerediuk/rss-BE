import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import dotenv from 'dotenv';

dotenv.config();


export const auth = async (event, ctx, cb) => {

  try {
    const authorizationToken = event.authorizationToken;
    
    const encodedCreds = authorizationToken.split(' ')[1];
    console.log(encodedCreds)
    const buff = Buffer.from(encodedCreds, 'base64');
    console.log(buff);
    const plainCreds = buff.toString('utf-8').split(':');

    const username = plainCreds[0];
    const password = plainCreds[1];

    console.log(username, password);

    const effect = (process.env[username] != undefined && process.env[username] == password) ? 'Allow' : 'Deny'
    console.log(effect)

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);
    cb(null, policy);
    
    
  } catch (error) {
    return cb(`Unauthorised: ${error.message}`);
  }
}

const generatePolicy = (principalId, resource, effect)=>{
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        }
      ]
    }
  };
}

export const main = middyfy(auth);
