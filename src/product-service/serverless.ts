import type { AWS } from '@serverless/typescript';

//import hello from '@functions/hello';
import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import createProduct from '@functions/createProduct';
import catalogBatchProcess from '@functions/catalogBatchProcess';


const serverlessConfiguration: AWS = {
  service: 'product-service',
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
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DB_HOST: '${env:DB_HOST}',
      DB_PORT: '${env:DB_PORT}',
      DB_BASE: '${env:DB_BASE}',
      DB_USER: '${env:DB_USER}',
      DB_PWD: '${env:DB_PWD}',
      BUCKET: '${env:BUCKET}',

      LOW_PRICE_LIMIT: '${env:LOW_PRICE_LIMIT}',
      HIGHT_PRICE: '${env:HIGHT_PRICE}',
      LOW_PRICE: '${env:LOW_PRICE}',

      SQSQueueName: '${env:SQSQueueName}',
      SNSTopicName: '${env:SNSTopicName}',

      BATCH_SQS_SIZE: '${env:BATCH_SQS_SIZE}',
      SQS_URL : {
        Ref: "SQSQueue"
      },
      SNS_ARN : {
        Ref: "SNSTopic"
      }
    },
    iamRoleStatements: [
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

    Outputs: {
      SQSQueueLink: {
        Value: {
          Ref: 'SQSQueue',
        },
      },
      SQSQueueArn: {
        Value: {
          'Fn::GetAtt': ['SQSQueue', 'Arn'],
        },
      }
    },
  },


  // import the function via paths
  functions: { 
    getProductsList, 
    getProductsById, 
    createProduct,
    catalogBatchProcess,
  },
};

module.exports = serverlessConfiguration;
