import type { AWS } from '@serverless/typescript';

//import hello from '@functions/importProductsFile';


//import hello from '@functions/hello';
import importProductsFile from '@functions/importProductsFile';
//import importFileParser from '@functions/importFileParser';



const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-jest-plugin'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',

    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['s3:ListBucket'],
        Resource: ['arn:aws:s3:::rss-app-upload'],
      },

      {
        Effect: 'Allow',
        Action: ['s3:*'],
        Resource: ['arn:aws:s3:::rss-app-upload/*'],
      },

      // {
      //   Effect: 'Allow',
      //   Action: ['sqs:*'],
      //   Resource: [{"Fn::GetAtt": [ 'SQSQueue', 'Arn' ]},],
      // },

      // {
      //   Effect: 'Allow',
      //   Action: ['sns:*'],
      //   Resource: [{"Ref": "SNSTopic"},],
      // },
    ],

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      BUCKET: '${env:BUCKET}',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { 
    //importFileParser, 
    importProductsFile
  },
};

module.exports = serverlessConfiguration;

