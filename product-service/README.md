# endpoints:
  GET - https://m4pe19u35i.execute-api.eu-west-1.amazonaws.com/dev/products
  GET - https://m4pe19u35i.execute-api.eu-west-1.amazonaws.com/dev/products/{productId}
  POST - https://m4pe19u35i.execute-api.eu-west-1.amazonaws.com/dev/products

# frontend
    https://d3pd9pfex9j5gu.cloudfront.net/

# for test POST query use POSTMAN (body -> rawData -> JSON) or CURL query (before copypaste - change your<Value> to your data):
curl -v --header "Content-Type: application/json" --request POST  --data '{"title":"yourTitle","description":"yourDescription", "price": yourPrice, "count":yourCount}' https://m4pe19u35i.execute-api.eu-west-1.amazonaws.com/dev/products
    
    1 - Task 4.1 is implemented
    3 - TASK 4.2 is implemented lambda links are provided and returns data
    4 - TASK 4.3 is implemented lambda links are provided and products is stored in DB (call TASK 4.2 to see the product)
    5 - Your own Frontend application is integrated with product service (/products API) and products from product-service are represented on Frontend. Link to a working Front-End application is provided for cross-check reviewer.

Additional (optional) tasks (but nice to have):

    +1 (All languages) - POST/products lambda functions returns error 400 status code if product data is invalid
    +1 (All languages) - All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
    +1 (All languages) - All lambdas do console.log for each incoming requests and their arguments
    +1 (All languages) - Transaction based creation of product (in case stock creation is failed then related to this stock product is not created and not ready to be used by the end user and vice versa) (https://devcenter.kinvey.com/nodejs/tutorials/bl-transactional-support)

total: 9/9



# SWAGGER LINK:    
    https://app.swaggerhub.com/apis-docs/RSS9/task3/1.0.0-oas3   
   
#endpoints:   
  GET - https://6ljyzakuy6.execute-api.eu-west-1.amazonaws.com/dev/products   
  GET - https://6ljyzakuy6.execute-api.eu-west-1.amazonaws.com/dev/products/{productId}   
        ex. https://6ljyzakuy6.execute-api.eu-west-1.amazonaws.com/dev/products/1   
productId ex 1,2,3 etc..   
   
#for test run:   
    npm run test   
   
PR to SHOP-FE   
	https://github.com/DmitrySerediuk/rss-FE/pull/1   
PR to SHOP-BE   
	https://github.com/DmitrySerediuk/rss-BE/pull/1   
   
Done:   
    1 - poiproduct-service serverless config contains configuration for 2 lambda functions, API is not working at all, but YAML configuration is correct   
    2 - The getProductsList OR getProductsById lambda function returns a correct response (POINT1)   
    3 - The getProductsById AND getProductsList lambda functions return a correct response code (POINT2)   
    4 - Your own Frontend application is integrated with product service (/products API) and products from product-service are represented on Frontend. AND POINT1 and POINT2 are done.   
   
Additional (optional) tasks (but nice to have):   
   
    +1 - Async/await is used in lambda functions   
    +1 - ES6 modules are used for product-service implementation   
    +1 - Webpack is configured for product-service   
    +1 (All languages) - SWAGGER documentation is created for product-service   
    +1 (All languages) - Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module (file) and separated in codebase.   
    +1 (All languages) - Main error scenarious are handled by API ("Product not found" error).   
   
TOTAL: 11/11   
