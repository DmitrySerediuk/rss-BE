import type { AWS } from '@serverless/typescript';


import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

import * as dotenv from 'dotenv';
dotenv.config();


const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    systemUrl: 5
  },
  plugins: [
    'serverless-webpack',
    'serverless-jest-plugin',
    'serverless-dotenv-plugin'
  ],

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',

    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['s3:ListBucket'],
        Resource: ['arn:aws:s3:::${env:BUCKET}'],
      },

      {
        Effect: 'Allow',
        Action: ['s3:*'],
        Resource: ['arn:aws:s3:::${env:BUCKET}/*'],
      },

      {
        Effect: "Allow",
        Action: "sqs:*",
        Resource: `\${cf:${process.env.PRODUCT_SERVICE}-\${self:provider.stage}.SQSQueueArn}`,
      },
      
    ],

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      BUCKET: '${env:BUCKET}',
      SQS_URL: `\${cf:${process.env.PRODUCT_SERVICE}-\${self:provider.stage}.SQSQueueLink}`,
    },
    lambdaHashingVersion: '20201221',
  },

 
  // import the function via paths
  functions: { 
    importFileParser, 
    importProductsFile,
  },

  resources:{
    Resources: {

      GatewayResponseAccessDenied: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          RestApiId: {
            Ref: 'ApiGatewayRestApi'
          },
          ResponseType: 'ACCESS_DENIED',
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
        }
      },

      GatewayResponseUnauthorized: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          RestApiId: {
            Ref: 'ApiGatewayRestApi'
          },
          ResponseType: 'DEFAULT_4XX',
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
        }
      }

    }
  }
};

module.exports = serverlessConfiguration;

