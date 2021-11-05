require('dotenv').config();

const express = require('express')
const axios = require('axios').default;
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const productCacheUrl = '/product/products'

const app = express()

app.use(cors({
    origin: '*'
}));

app.use(express.json());

class Cache{
    constructor(ttl = 120){
        this.ttl = ttl;
        this.status = null;
        this.data = null;
        this.expiredData = false;
    }

    setCachedData(status, message){
        this.status = status;
        this.data = message;
        this.expiredData = Date.now()+this.ttl*1000;
    }

    isExpired(){
        return (!this.expiredData || this.expiredData <= Date.now()) ? true : false;
    }

    getCachedData(){
        return this;
    }
}

let cache = new Cache(120);

app.all('/*', async(req, res) => {
    
    const dataUrl = req.url.split('/')
    const service = dataUrl[1]
    const serviceUrl = process.env[service]
    let status, message;
    
    if (serviceUrl){
        const urlQuery = `${serviceUrl}/${dataUrl.slice(2).join('/')}`;

        try{
            let useCache = (req.url == productCacheUrl)

            if (useCache && !cache.isExpired()){
                status = cache.getCachedData().status
                message = cache.getCachedData().data 
                console.log("get data from cache")
            }else{
                let responceApi = await axios({
                    method: req.method,
                    url: urlQuery,
                    ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
                })

                status = responceApi.status
                message = responceApi.data
                
                if (useCache){
                    cache.setCachedData(status, message)
                    console.log("send data to cache")
                }
               
            }
        }catch(err){
            // console.log(err)
            status = err.response.status
            message = err.message
            
        } 
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
        res.setHeader('Access-Control-Allow-Credentials', true); 

        res.status(status).json(message)
        
    }else{
        res.status(502).send('Cannot process request')
    }

})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
