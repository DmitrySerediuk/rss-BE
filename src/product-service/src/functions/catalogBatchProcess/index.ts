import { handlerPath } from '@libs/handlerResolver';
import dotenv from 'dotenv';

dotenv.config();

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        batchSize: Number(process.env.BATCH_SQS_SIZE),
        arn: {
          "Fn::GetAtt": ['SQSQueue', 'Arn']
        },
      },
    },
  ],

};

