DROP DATABASE IF EXISTS db_name
CREATE DATABASE db_name

use db_name

CREATE TABLE farley (
name VARCHAR(64) DEFAULT "Default Name",
age INT NOT NULL DEFAULT 18,
description VARCHAR(64) DEFAULT "Default Description"
);

INSET INTO farley(age) VALUES (24)

SELECT * from farley