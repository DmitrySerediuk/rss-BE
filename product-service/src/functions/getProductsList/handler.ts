import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { getAllProducts } from '@models/getAllProducts';

export const getProductsList = async () => {

  const productsData = await getAllProducts();
  return await formatJSONResponse(productsData);
}

export const main = middyfy(getProductsList);
