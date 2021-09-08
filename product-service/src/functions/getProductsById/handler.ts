import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import validator from 'validator';
import { httpStatus } from '@libs/httpStatus';

import { getDataProductByid } from '@models/getDataProductByid';
import { logging } from '@libs/logging';
//import { ConsoleWriter } from 'istanbul-lib-report';

export const getProductsById = async (event) => {
  try{
    logging('getProductsList', event);
    const productId = event.pathParameters.productId;

    if (validator.isUUID(productId,4)){
      const productData = await getDataProductByid(productId);
  
      if (productData.length > 0){
        return formatJSONResponse(productData, httpStatus.OK);    
      }else{
        return formatJSONResponse(`Product Id ${productId} not found`, httpStatus.NOT_FOUND);
      }
    }else{
      return formatJSONResponse(`Id ${productId} is not valid uuid`, httpStatus.SERVER_ERROR);
    }
  }catch(err){
      return formatJSONResponse("Error during getProductsById function execution", httpStatus.SERVER_ERROR);
  }
  
}

export const main = middyfy(getProductsById);
