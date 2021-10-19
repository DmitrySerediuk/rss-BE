
import {getProductsList} from '../src/functions/getProductsList/handler';


describe('getProductsList', () => {

  it('Return correct status code', async() => {
      const data = await getProductsList(false);
      expect(data.statusCode).toEqual(200);
  });

  it('Return products', async() => {
    const data = await getProductsList(false);
    expect(data.body).toBeDefined();
  });

});
