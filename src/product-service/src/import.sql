CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    description text,
    price numeric CHECK (price > 0),
);

CREATE TABLE IF NOT EXISTS stocks (
    product_id uuid,
    count integer,
    FOREIGN KEY("product_id") 
	  REFERENCES "products"("id")
);

INSERT INTO products  (title, description, price) VALUES ('GOOGLE', 'Google stock price', 990);
INSERT INTO products  (title, description, price) VALUES ('AMAZON', 'Amazon stock price', 9);
INSERT INTO stocks(product_id, "count") values(productID1, SELECT id from products WHERE title='GOOGLE');
INSERT INTO stocks(product_id, "count") values(productID2, SELECT id from products WHERE title='AMAZON');