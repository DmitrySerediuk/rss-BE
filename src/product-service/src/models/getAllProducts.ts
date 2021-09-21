import { Client } from 'pg';

import { dbOptions } from './dbOptions';
import { httpStatus } from '@libs/httpStatus';
import { dbTables } from './dbTables';


const getAllProducts = async () => {   
    const client = new Client(dbOptions);
    
    try{
        await client.connect();
    }catch(err){
        console.log("Error during db connection", err);
        client.end();
        return {status:httpStatus.SERVER_ERROR, message: "Error during db connection"};
    }

    try{
        let sql = `SELECT  
                        product.id AS "id",
                        product.title AS "title",
                        product.description AS "description", 
                        product.price AS "price", 
                        stock.count AS "count"  
                    FROM ${dbTables.PRODUCTS} product FULL OUTER JOIN ${dbTables.STOCKS} stock ON product.id = stock.product_id`;

        
        const listProducts = await client.query(sql);
        return listProducts.rows;
    }catch(err){
        console.log("Error during db request", err)
        return {status:httpStatus.SERVER_ERROR, message: "Error during db request"};
    }finally{
        client.end();
    }
}

export {getAllProducts}