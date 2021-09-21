import { Client } from 'pg';

import { dbOptions } from './dbOptions';
import { httpStatus } from '@libs/httpStatus';
import { dbTables } from './dbTables';

const getDataProductByid = async (id) => {
    const client = new Client(dbOptions);
    try{
        await client.connect();
    }catch(err){
        console.log("Error during db connection", err);
        client.end();
        return {status:httpStatus.SERVER_ERROR, message: "Error during db connection"};
    }

    let query = {
        text: ` SELECT  
                    product.id AS "id",
                    product.title AS "title",
                    product.description AS "description", 
                    product.price AS "price", 
                    stock.count AS "count"  
                FROM ${dbTables.PRODUCTS} product FULL OUTER JOIN ${dbTables.STOCKS} stock ON product.id = stock.product_id 
                WHERE product.id = $1`,
        values: [id],
    }
    
    try{
        const listProducts = await client.query(query);
        return listProducts.rows;
    }catch(err){
        return {status:httpStatus.SERVER_ERROR, message: "Error during db request"};
    }finally{
        client.end();
    }
}

export {getDataProductByid}