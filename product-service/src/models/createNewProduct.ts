import { Client } from 'pg';
import { dbOptions } from './dbOptions';

import { dbTables } from './dbTables';
import { httpStatus } from '@libs/httpStatus';


const createNewProduct = async (title, description, price, count) => {
    const client = new Client(dbOptions);
    try{
        await client.connect();
    }catch(err){
        console.log("Error during db connection", err);
        client.end();
        return {status:httpStatus.SERVER_ERROR, message: "Error during db connection"};
    }

    try {
        await client.query('BEGIN')
        let query = {
            text: `INSERT INTO ${dbTables.PRODUCTS}(title, description, price) VALUES ($1, $2, $3) RETURNING id;`,
            values: [title, description, price],
        }

        const id = await client.query(query);

        if (count != undefined){
            query = {
                text: `INSERT INTO ${dbTables.STOCKS}(product_id, count) VALUES ($1, $2)`,
                values: [id.rows[0].id, count],
            }

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