import {importProductsFile} from '../src/functions/importProductsFile/handler';
import {BUCKET} from '@config/settings';

import * as AWSMock from 'aws-sdk-mock';
import {httpStatus} from "@libs/httpStatus";

describe('importProductsFile', () => {
  process.env.BUCKET = BUCKET;

  afterEach(() => {
    
  });

  it('should return signed url', async () => {

   AWSMock.mock('S3', 'getSignedUrl', (_operation, _params, callback) => {
      return callback(null, 'Correct signed url from AWS');
    });
    
    const result = await importProductsFile({
      queryStringParameters: { name: 'test' },
    } );

    AWSMock.restore('S3');
    expect(JSON.parse(result.body).message).toBe('Correct signed url from AWS');
  }); 

  it('should return 400 code if GET name parametrs not found', async () => {

     const result = await importProductsFile({
       queryStringParameters: { name: undefined },
     } );

     expect(result.statusCode).toBe(httpStatus.BAD_REQUEST);
   }); 

   it('should return 500 error code if s3 raise error', async () => {

    AWSMock.mock('S3', 'getSignedUrl', (_operation, _params) => {
      throw new Error('Test error');
     });
     
     const result = await importProductsFile({
       queryStringParameters: { name: 'test' },
     } );

     AWSMock.restore('S3');
     expect(result.statusCode).toBe(httpStatus.SERVER_ERROR);
   }); 


});
