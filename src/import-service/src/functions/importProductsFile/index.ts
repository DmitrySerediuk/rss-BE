//import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

import * as dotenv from 'dotenv';
dotenv.config();

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        authorizer: `\${cf:${process.env.AUTH_SERVICE}-\${self:provider.stage}.authArn}`,
        request: {
          parameters: {
            querystrings: {
              'name': true
            }
          }
        }
      }
    }
  ]
}

