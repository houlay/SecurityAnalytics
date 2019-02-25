DROP DATABASE IF EXISTS security_analytics;
CREATE DATABASE security_analytics;

-- // you probably don't need this but if you do, it's hard to figure out.
-- // Sequelizer inserts the dates so mysql will bark if you don't do it
-- // use the following to seed data in the users table, if needed.
-- // there has to be a record in users or you get a foriegn key violation
-- // on the protfolio table
-- INSERT INTO `security_analytics`.`users`
-- (`id`,
-- `name`,
-- `email`,
-- `createdAt`,
-- `updatedAt`)
-- VALUES (default, 'test user', 'test@test.com', '9999-12-31', '9999-12-31');

