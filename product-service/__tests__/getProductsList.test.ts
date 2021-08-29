
import {getProductsList} from '../src/functions/getProductsList/handler';


describe('getProductsList', () => {

  it('Return correct status code', async() => {
      const data = await getProductsList();
      //console.log(data);
      expect(data.statusCode).toEqual(200);
  });

  it('Return products', async() => {
    const data = await getProductsList();
    expect(data.body).toBeDefined();
  });

});
