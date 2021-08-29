
import {getProductsById} from '../src/functions/getProductsById/handler';


describe('getProductsById', () => {

  const productIdObj = {
    pathParameters: {
      productId: "1",
    },
  };

  const wrondProductIdObj = {
    pathParameters: {
      productId: "11",
    },
  };

  it('Return correct status code 200', async() => {
      const data = await getProductsById(productIdObj);
      console.log(data);
      expect(data.statusCode).toEqual(200);
  });

  it('Return correct structure of data', async() => {
    const data = await getProductsById(productIdObj);
    const product = JSON.parse(data.body)
    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("count");
    expect(product).toHaveProperty("title");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("description");
});

it('Return status code 404 if wrong id', async() => {
  const data = await getProductsById(wrondProductIdObj);
  console.log(data);
  expect(data.statusCode).toEqual(404);
});


});
