import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { httpStatus } from '@libs/httpStatus';
import { getAllProducts } from '@models/getAllProducts';
import { logging } from '@libs/logging';

export const getProductsList = async (event) => {

  try{
      logging('getProductsList', event);
      const productsData = await getAllProducts();
      return formatJSONResponse(productsData, httpStatus.OK);
  }catch(err){
      const errorMessage = "Error during getProductsList function execution";
      return formatJSONResponse(errorMessage, httpStatus.SERVER_ERROR);
  }
  
}

export const main = middyfy(getProductsList);
