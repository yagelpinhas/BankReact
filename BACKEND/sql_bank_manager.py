import pymysql
class SQL_BANK_MANAGER:
    def __init__(self):
        self.connection= pymysql.connect(
        host="localhost",
        user="root",
        password="",
        db="bank_data_base",
        charset="utf8",
        cursorclass=pymysql.cursors.DictCursor
        )

    def get_transactions(self):
        try:
            with self.connection.cursor() as cursor:
                query =f'SELECT * FROM transactions'
                cursor.execute(query)
                results = cursor.fetchall()
                return results
        except TypeError as e:
            print(e)
    def add_transaction(self,amount,category,vendor):
        try:
            with self.connection.cursor() as cursor:
                query =f'SELECT * FROM categories WHERE categories.name="{category}"'
                cursor.execute(query)
                result = cursor.fetchall()
                if len(result)==0:
                    raise Exception
                query = f'INSERT INTO transactions (amount,category,vendor) VALUES({amount},"{category}","{vendor}");'
                cursor.execute(query)
                self.connection.commit()
        except TypeError as e:
            print(e)
    def delete_transaction(self,id):
        try:
            with self.connection.cursor() as cursor:
                query =f'SELECT * FROM transactions WHERE transactions.id={id}'
                cursor.execute(query)
                result = cursor.fetchall()
                if len(result)==0:
                    raise Exception
                query = f'DELETE FROM transactions WHERE id={id};'
                cursor.execute(query)
                self.connection.commit()
        except TypeError as e:
            print(e)

    def get_breakdown(self):
        try:
            with self.connection.cursor() as cursor:
                query =f'SELECT category,SUM(amount) as sum FROM transactions GROUP BY category'
                cursor.execute(query)
                results = cursor.fetchall()
                return results
        except TypeError as e:
            print(e) 
