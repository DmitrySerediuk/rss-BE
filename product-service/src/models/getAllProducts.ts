import { client } from './newClient';
import { httpStatus } from '@libs/httpStatus';
import { dbTables } from './dbTables';

const getAllProducts = async () => {    
    try{
        await client.connect();
    }catch(err){
        console.error("Error during db connection", err);
        client.end();
        return {status:httpStatus.SERVER_ERROR, message: "Error during db connection"};
    }

    try{
        let sql = "SELECT * FROM "+dbTables.PRODUCTS+" FULL OUTER JOIN "+dbTables.STOCKS+" ON "+dbTables.PRODUCTS+".id = "+dbTables.STOCKS+".product_id;";
        const listProducts = await client.query(sql);
        return listProducts.rows;
    }catch(err){
        console.error("Error during db request", err)
        return {status:httpStatus.SERVER_ERROR, message: "Error during db request"};
    }finally{
        client.end();
    }
}

export {getAllProducts}