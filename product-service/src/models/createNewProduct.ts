import { client } from './newClient';

import { dbTables } from './dbTables';
import { httpStatus } from '@libs/httpStatus';
import { ConsoleWriter } from 'istanbul-lib-report';


const createNewProduct = async (title, description, price, count) => {
    try{
       // console.log(client);
        await client.connect();
    }catch(err){
        console.error("Error during db connection", err);
        client.end();
        return {status:httpStatus.SERVER_ERROR, message: "Error during db connection"};
    }

    try {
        await client.query('BEGIN')
        let query = {
            text: `INSERT INTO ${dbTables.PRODUCTS}(title, description, price) VALUES ('$1', '$2', $3) RETURNING id;`,
            values: [title, description, price],
        }

        console.log(query); 
        const id = await client.query(query);
        console.log(id.rows[0].id);
        if (count != 'undefined'){
            query = {
                text: `INSERT INTO ${dbTables.STOCKS}(product_id, count) VALUES ($1, $2)`,
                values: [id.rows[0].id, count],
            }
            console.log(query); 
            await client.query(query);
        }
      
        await client.query('COMMIT')

        return {status:httpStatus.OK, message: {
            productId : id,
            title : title,
            description : description,
            price : price,
            count : count,
        }};

      } catch (err) {
        await client.query('ROLLBACK')
        console.error("Error during db INSERT request, rollback...", err);
        return {status:httpStatus.SERVER_ERROR, message: "Error during db INSERT request, try again"};
      } finally {
        client.end();
      }

}

export {createNewProduct}