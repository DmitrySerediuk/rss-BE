import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

//import * as productData from '../../data/products.json';

import {getAllProducts} from '../../data/productMock';

export const getProductsList = async () => {
  const productsData = await getAllProducts();
  return await formatJSONResponse(productsData);
}

export const main = middyfy(getProductsList);
