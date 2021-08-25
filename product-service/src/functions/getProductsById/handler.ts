import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

//import * as productData from '../../data/products.json';

const getProductsById = async (event) => {
  //productId = event.queryStringParameters.id
  console.log("log from  getProductsById:", event);
  return formatJSONResponse({
    product: 'hi',
    event,
  });
}

export const main = middyfy(getProductsById);
