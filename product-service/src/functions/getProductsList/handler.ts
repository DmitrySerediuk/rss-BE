import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import * as productData from '../../data/products.json';

const getProductsList = async (event) => {
  return formatJSONResponse(productData.default);
}

export const main = middyfy(getProductsList);
