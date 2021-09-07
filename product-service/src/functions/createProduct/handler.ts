import 'source-map-support/register';

import { formatJSONResponse, formatJSONErrorResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { createNewProduct } from '@models/createNewProduct';
import { httpStatus } from '@models/httpStatus';

export const createProduct = async (event) => {
  const { title, description, price, count } = event.pathParameters;

  if (typeof title != 'string'){
    return formatJSONErrorResponse(`Title is incorrect ${title}`, 400);
  }

  if (typeof description != 'string'){
    return formatJSONErrorResponse(`Description is incorrect ${description}`, 400);
  }

  console.log(typeof price);

  if ((typeof price != 'number' || price < 0)){
    return formatJSONErrorResponse(`Price is incorrect ${price}`, 400);
  }

  if ((typeof count != 'number' || count < 0) && count !== undefined){
    return formatJSONErrorResponse(`Count is incorrect ${count}`, 400);
  }

  const resultCreateProduct = await createNewProduct(title, description, price, count);

  if (resultCreateProduct.status == httpStatus.OK){
    return formatJSONResponse(resultCreateProduct.message);    
  }else{
    return formatJSONErrorResponse(JSON.stringify(resultCreateProduct.message), resultCreateProduct.status);
  }
}

export const main = middyfy(createProduct);
