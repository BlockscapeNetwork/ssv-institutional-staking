CREATE DATABASE keystore CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';
CREATE USER 'keystore'@'localhost' IDENTIFIED BY 'keystore';
GRANT ALL PRIVILEGES ON keystore.* TO 'keystore'@'localhost' IDENTIFIED BY 'keystore';
CREATE USER 'keystore'@'%' IDENTIFIED BY 'keystore';
GRANT ALL PRIVILEGES ON keystore.* TO 'keystore'@'%' IDENTIFIED BY 'keystore';
FLUSH PRIVILEGES;
