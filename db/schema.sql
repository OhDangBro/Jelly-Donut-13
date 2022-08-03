DROP DATABASE IF EXISTS ecommerce_db;
CREATE DATABASE ecommerce_db;
USE ecommerce_db;

/* 
Step 1: export PATH=${PATH}:/usr/local/mysql/bin
Step 2: myswl -u root -p
Step 3: source db/schema.sql
Step 4: SHOW DATABASES;
Step 5: USE ecommerce_db;
Step 6: exit;
Step 7: npm run seed
Step 8: npm run start