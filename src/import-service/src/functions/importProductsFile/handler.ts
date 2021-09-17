import 'source-map-support/register';
import { S3 } from 'aws-sdk';
import {httpStatus} from "../../../../libs/httpStatus";

const {BUCKET} = process.env;

import { formatJSONResponse } from '../../../../libs/apiGateway';
import { middyfy } from '../../../../libs/lambda';

const importProductsFile = async (event) => {
  try {
    console.log(event);
    const dirName = event.queryStringParameters.name;

    const dirPath = `uploaded/${dirName}`;

    const params = {
        Bucket: BUCKET,
        Key: dirPath,
        Expires: 60,
        ContentType: 'text/csv'
    };

    const s3 = new S3({region: 'eu-west-1'});
    const url = await s3.getSignedUrlPromise('putObject', params)

    return formatJSONResponse(url, httpStatus.OK);
  } catch (error) {
    return formatJSONResponse(error, httpStatus.SERVER_ERROR);
  }
}

export const main = middyfy(importProductsFile);
