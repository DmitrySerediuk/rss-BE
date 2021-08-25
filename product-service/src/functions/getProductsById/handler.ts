import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse, formatJSONErrorResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import * as productsData from '../../data/products.json';

const getProductsById = async (event) => {
  const productId = event.pathParameters.productId

  const productData = productsData.find (prod => prod.id == productId)

  if (productData){
    return formatJSONResponse({
      product: productData,
    });    
  }else{
    return formatJSONErrorResponse(productId, 404);
  }
}

export const main = middyfy(getProductsById);
