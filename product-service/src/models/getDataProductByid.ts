import { client } from './newClient';

import { dbTables } from './dbTables';

const getDataProductByid = async (id) => {
    try{
       // console.log(client);
        await client.connect();
    }catch(err){
        console.error("Error during db connection", err);
        client.end();
        return {status:500, message: "Error during db connection"};
    }
    
    try{
        let sql = "SELECT * FROM "+dbTables.PRODUCTS+" FULL OUTER JOIN "+dbTables.STOCKS+" ON "+dbTables.PRODUCTS+".id = "+dbTables.STOCKS+".product_id WHERE "+dbTables.PRODUCTS+".id = '"+id+"'";

        const listProducts = await client.query(sql);
        return listProducts.rows;
    }catch(err){
        console.error("Error during db request", err)
        return {status:500, message: "Error during db request"};
    }finally{
        client.end();
    }
}

export {getDataProductByid}