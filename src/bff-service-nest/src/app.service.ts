require('dotenv').config();
import { Injectable, Req, Res } from '@nestjs/common';
const axios = require('axios').default;

const productCacheTemplate = /^\/product\/products\/?$/

class Cache{
  ttl: number;
	status: any;
	data: any;
  expiredData: any;
  expiredDateUser: any;
  
  constructor(ttl = 120){
      this.ttl = ttl;
      this.status = null;
      this.data = null;
      this.expiredData = false;
      this.expiredDateUser = false
  }

  setCachedData(status, message){
      this.status = status;
      this.data = message;
      this.expiredData = Date.now()+this.ttl*1000;
      this.expiredDateUser = new Date(new Date().getTime() + (this.ttl * 1000)).toISOString();
  }

  isExpired(){
      return (!this.expiredData || this.expiredData <= Date.now()) ? true : false;
  }

  getCachedData(){
      return this;
  }
}

let cache = new Cache(120);

@Injectable()
export class AppService {
  async proxyRequest(@Req()req: any, @Res() res: any): Promise<any> {
    const dataUrl = req.url.split('/')
    const service = dataUrl[1]
    const serviceUrl = process.env[service]
    let status, message;
  
    if (serviceUrl){
      const urlQuery = `${serviceUrl}/${dataUrl.slice(2).join('/')}`;

      try{
          let useCache = productCacheTemplate.test(req.url)

          let cacheIsExp = cache.isExpired()
          if (useCache && !cache.isExpired()){
              status = cache.getCachedData().status
              message = cache.getCachedData().data 
              message.type = 'cache'

              console.log("get data from cache")
          }else{
              let responceApi = await axios({
                  method: req.method,
                  url: urlQuery,
                  ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
              })

              status = responceApi.status
              message = responceApi.data
              message.type = 'original'

              if (useCache){
                  
                  cache.setCachedData(status, message)
                  console.log("send data to cache")
              }
             
          }
          message.currentDate = new Date().toISOString();
          message.expiredCacheDate = cache.getCachedData().expiredDateUser 
      }catch(err){
          console.log(err)
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
  }
}
