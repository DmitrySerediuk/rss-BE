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

TOTAL: 9/9