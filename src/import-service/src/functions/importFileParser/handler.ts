import 'source-map-support/register';
import { S3, SQS } from 'aws-sdk';
import {httpStatus} from "@libs/httpStatus";

import csv from 'csv-parser';

const {BUCKET} = process.env;

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import {UPLOAD_DIR, PARSED_DIR} from '@config/settings';

const importFileParser = async (event) => {

  try {
    const s3 = new S3({region: 'eu-west-1'});
    const sqs = new SQS({region: 'eu-west-1'});

    event.Records.forEach(async (record) => {
      
      const s3Stream = s3.getObject({
          Bucket: BUCKET,
          Key: record.s3.object.key
      }).createReadStream();


      s3Stream.pipe(csv())
        .on('data', (data) => {
          console.log(data);
          sqs.sendMessage({
            QueueUrl: process.env.SQS_URL,
            MessageBody: JSON.stringify(data),
          }, () => {
            console.log(`Send data ${data.title} to SQS`);
          });
        })
        .on('error', () => {
          throw new Error('Error occurred during csv parser');
        })
        .on('end', async () => {
          console.log(`Copy from ${BUCKET}/${record.s3.object.key}`);

          await s3.copyObject({
            Bucket: BUCKET,
            CopySource: `${BUCKET}/${record.s3.object.key}`,
            Key: record.s3.object.key.replace(UPLOAD_DIR, PARSED_DIR)
          }).promise();

          console.log(`Copied into ${BUCKET}/${record.s3.object.key.replace(UPLOAD_DIR, PARSED_DIR)}`);


          await s3.deleteObject({
            Bucket: BUCKET,
            Key: record.s3.object.key,
          }).promise();
        })
    });

    return formatJSONResponse("done", httpStatus.OK);
  } catch (error) {
    return formatJSONResponse(error, httpStatus.SERVER_ERROR);
  }
}

export const main = middyfy(importFileParser);
