import 'source-map-support/register';

import { formatJSONResponse, formatJSONErrorResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import validator from 'validator';
import { httpStatus } from '@models/httpStatus';

import { getDataProductByid } from '@models/getDataProductByid';
import { ConsoleWriter } from 'istanbul-lib-report';

export const getProductsById = async (event) => {
  console.log(event);
  const productId = event.pathParameters.productId;

  if (validator.isUUID(productId,4)){
    const productData = await getDataProductByid(productId);

    if (productData.length > 0){
      return formatJSONResponse(productData);    
    }else{
      return formatJSONErrorResponse(productId, httpStatus.NOT_FOUND);
    }
  }else{
    console.log('here', httpStatus)
    return formatJSONErrorResponse(`Id ${productId} is not valid uuid`, httpStatus.SERVER_ERROR);
  }
}

export const main = middyfy(getProductsById);
