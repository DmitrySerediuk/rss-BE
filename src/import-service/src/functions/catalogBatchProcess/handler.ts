import { SNS } from 'aws-sdk';
import {httpStatus} from "@libs/httpStatus";

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import {createNewProduct} from '../../../../product-service/src/models/createNewProduct';

export const catalogBatchProcess = async (event) => {

  try {
    for (const record of event.Records) {
      const messages = JSON.parse(record.body);

      const sns = new SNS({region: 'eu-west-1'});
      const typePrice = (messages.price > process.env.LOW_PRICE_LIMIT) ? process.env.HIGHT_PRICE : process.env.LOW_PRICE

      const {title, description, price, count} = messages;
   
      const resultCreateProduct = await createNewProduct(title, description, price, count);

      sns.publish({
        Subject: `Product ${messages.title} added to db. Send ${typePrice} notification`,
        Message: JSON.stringify(messages),
        TopicArn: process.env.SNS_ARN,
        MessageAttributes: {
          Price: {
            DataType: 'String',
            StringValue: typePrice
          },
        }
      }, () => {
        console.log("Send email with items");
      });

      console.log(resultCreateProduct);
    }
    
    

    return formatJSONResponse("done", httpStatus.OK);
  } catch (error) {
    return formatJSONResponse(error, httpStatus.SERVER_ERROR);
  }
}

export const main = middyfy(catalogBatchProcess);
