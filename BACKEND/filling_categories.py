import json
import pymysql 
import categories

connection = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    db="bank_data_base",
    charset="utf8",
    cursorclass=pymysql.cursors.DictCursor
)
def insertCategory(name):
    try:
        with connection.cursor() as cursor:
            query = f'INSERT INTO categories (name) VALUES("{name}");'
            cursor.execute(query)
            connection.commit()
    except TypeError as e:
        print(e)

def insertCategories():
    for name in categories.categories_names:
        insertCategory(name)

insertCategories()