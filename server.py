from tkinter.tix import Tree
from fastapi import FastAPI , status ,  HTTPException , Request , Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import requests
import pymysql
from fastapi.middleware.cors import CORSMiddleware
connection = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    db="bank_data_base",
    charset="utf8",
    cursorclass=pymysql.cursors.DictCursor
)

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/transactions/")    
async def get_transactions():
    try:
        with connection.cursor() as cursor:
            query =f'SELECT * FROM transactions'
            cursor.execute(query)
            results = cursor.fetchall()
            return results
    except TypeError as e:
        print(e)

@app.post("/transactions")
async def add_transaction(amount,category,vendor):
    try:
        with connection.cursor() as cursor:
            query = f'INSERT INTO transactions (amount,category,vendor) VALUES({amount},"{category}","{vendor}");'
            cursor.execute(query)
            connection.commit()
    except TypeError as e:
        print(e)

@app.delete("/transactions")
async def delete_transaction(id):
    try:
        with connection.cursor() as cursor:
            query = f'DELETE FROM transactions WHERE id={id};'
            cursor.execute(query)
            connection.commit()
    except TypeError as e:
        print(e)

@app.get("/breakdown/")
async def get_breakdown():
    try:
        with connection.cursor() as cursor:
            query =f'SELECT category,SUM(amount) as sum FROM transactions GROUP BY category'
            cursor.execute(query)
            results = cursor.fetchall()
            return results
    except TypeError as e:
        print(e)       

@app.get('/')
def root():
    return "Server is running"

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000,reload=True)