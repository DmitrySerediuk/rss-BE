import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import {httpStatus} from "@libs/httpStatus";



import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import {UPLOAD_DIR} from '@config/settings';

export const importProductsFile = async (event) => {

  const {BUCKET} = process.env;

  try {
    
    if (!event.queryStringParameters.name) {
      return formatJSONResponse('BAD REQUEST', httpStatus.BAD_REQUEST);
    }

    const dirName = event.queryStringParameters.name;
    
    const dirPath = `${UPLOAD_DIR}/${dirName}`;

    const params = {
        Bucket: BUCKET,
        Key: dirPath,
        Expires: 60,
        ContentType: 'text/csv'
    };
    const s3 = new AWS.S3({region: 'eu-west-1'});
    const url = await s3.getSignedUrlPromise('putObject', params)
    return formatJSONResponse(url, httpStatus.OK);
  } catch (error) {
    return formatJSONResponse(error, httpStatus.SERVER_ERROR);
  }
}

export const main = middyfy(importProductsFile);
