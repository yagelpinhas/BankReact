use bank_data_base;
CREATE TABLE transactions(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    amount INT,
    category VARCHAR(50),
    vendor VARCHAR(50),
    FOREIGN KEY(category) REFERENCES categories(name)
    
);