import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@common/apiGateway';
import { formatJSONResponse, formatJSONErrorResponse } from '@common/apiGateway';
import { middyfy } from '@common/lambda';

import schema from './schema';
import { createNewProduct } from '@models/createNewProduct';
import { httpStatus } from '@libs/httpStatus';
import { logging } from '@libs/logging';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try{
    logging('getProductsList', event);

    const { title, description, price, count } = event.body;
   
    const resultCreateProduct = await createNewProduct(title, description, price, count);

    return formatJSONResponse(JSON.stringify(resultCreateProduct.message), resultCreateProduct.status);

  }catch(err){
      return formatJSONResponse("Error during createProduct function execution", httpStatus.SERVER_ERROR);
  }
}

export const main = middyfy(createProduct);
