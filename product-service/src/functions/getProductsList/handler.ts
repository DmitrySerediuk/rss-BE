import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import * as productData from '../../data/products.json';

const getProductsList = async (event) => {
  console.log("my from task3:", productData);
  return formatJSONResponse({
    product: productData.products,
    event,
  });
}

export const main = middyfy(getProductsList);
