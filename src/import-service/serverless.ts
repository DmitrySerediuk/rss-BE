import type { AWS } from '@serverless/typescript';


import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';
import catalogBatchProcess from '@functions/catalogBatchProcess';

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
        Effect: 'Allow',
        Action: ['sqs:*'],
        Resource: { 'Fn::GetAtt': ['SQSQueue', 'Arn'] }, 
      },

      {
        Effect: 'Allow',
        Action: ['sns:*'],
        Resource: { Ref: 'SNSTopic' },
      },

    ],

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      DB_HOST: '${env:DB_HOST}',
      DB_PORT: '${env:DB_PORT}',
      DB_BASE: '${env:DB_BASE}',
      DB_USER: '${env:DB_USER}',
      DB_PWD: '${env:DB_PWD}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      BUCKET: '${env:BUCKET}',
      SQSQueueName: '${env:SQSQueueName}',
      BATCH_SQS_SIZE: process.env.BATCH_SQS_SIZE,
      SQS_URL : {
        Ref: "SQSQueue"
      },
      SNS_ARN : {
        Ref: "SNSTopic"
      }
    },
    lambdaHashingVersion: '20201221',
  },

  resources: {
    Resources: {
      SQSQueue: {     
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: '${env:SQSQueueName}',
        },
      },

      SNSTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: '${env:SNSTopicName}',
        },
      },

  
      SNSSubscriptionLowPrice: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "${env:SNS_MAIL_LOW}",
          Protocol: "email",
          TopicArn: {
            Ref: "SNSTopic",
          },
          FilterPolicy: {
            Price: ["${env:LOW_PRICE}"]
          }
        },
      }, 
      
      SNSSubscriptionHightPrice: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "${env:SNS_MAIL_HIGHT}",
          Protocol: "email",
          TopicArn: {
            Ref: "SNSTopic",
          },
          FilterPolicy: {
            Price: ["${env:HIGHT_PRICE}"]
          }
        },
      },
    },
  },

  // import the function via paths
  functions: { 
    importFileParser, 
    importProductsFile,
    catalogBatchProcess
  },
};

module.exports = serverlessConfiguration;

