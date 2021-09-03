import 'source-map-support/register';

import { formatJSONResponse, formatJSONErrorResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { getDataProductByid } from '@models/getDataProductByid';

export const getProductsById = async (event) => {
  const productId = event.pathParameters.productId;
  const productData = await getDataProductByid(productId);

  if (productData){
    return formatJSONResponse(productData);    
  }else{
    return formatJSONErrorResponse(productId, 404);
  }
}

export const main = middyfy(getProductsById);
