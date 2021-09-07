import 'source-map-support/register';

import { formatJSONResponse, formatJSONErrorResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { httpStatus } from '@libs/httpStatus';
import { getAllProducts } from '@models/getAllProducts';
import { logging } from '@libs/logging';

export const getProductsList = async (event) => {

  try{
      logging('getProductsList', event);
      const productsData = await getAllProducts();
      return formatJSONResponse(productsData);
  }catch(err){
      const errorMessage = "Error during getProductsList function execution";
      console.error(errorMessage, err);
      return formatJSONErrorResponse(errorMessage, httpStatus.SERVER_ERROR);
  }
  
}

export const main = middyfy(getProductsList);
