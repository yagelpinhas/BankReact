use bank_data_base;

SELECT category,SUM(amount) FROM transactions GROUP BY category