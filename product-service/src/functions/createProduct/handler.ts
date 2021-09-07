import 'source-map-support/register';

import { formatJSONResponse, formatJSONErrorResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { createNewProduct } from '@models/createNewProduct';
import { httpStatus } from '@libs/httpStatus';
import { logging } from '@libs/logging';

export const createProduct = async (event) => {
  try{
    logging('getProductsList', event);
    
    const { title, description, price, count } = event.pathParameters;

    if (typeof title != 'string'){
      return formatJSONErrorResponse(`Title is incorrect ${title}`, httpStatus.BAD_REQUEST);
    }

    if (typeof description != 'string'){
      return formatJSONErrorResponse(`Description is incorrect ${description}`, httpStatus.BAD_REQUEST);
    }

    if ((typeof price != 'number' || price < 0)){
      return formatJSONErrorResponse(`Price is incorrect ${price}`, httpStatus.BAD_REQUEST);
    }

    if ((typeof count != 'number' || count < 0) && count !== undefined){
      return formatJSONErrorResponse(`Count is incorrect ${count}`, httpStatus.BAD_REQUEST);
    }

    const resultCreateProduct = await createNewProduct(title, description, price, count);

    if (resultCreateProduct.status == httpStatus.OK){
      return formatJSONResponse(resultCreateProduct.message);    
    }else{
      return formatJSONErrorResponse(JSON.stringify(resultCreateProduct.message), resultCreateProduct.status);
    }
  }catch(err){
      const errorMessage = "Error during createProduct function execution";
      console.error(errorMessage, err);
      return formatJSONErrorResponse(errorMessage, httpStatus.SERVER_ERROR);
  }
}

export const main = middyfy(createProduct);
