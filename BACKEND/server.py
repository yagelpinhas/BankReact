from tkinter.tix import Tree
from fastapi import FastAPI , status ,  HTTPException , Request , Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import requests
import pymysql
from fastapi.middleware.cors import CORSMiddleware
from SQL_Bank_Manager import SQL_BANK_MANAGER
from Database_Manager import Database_Manager

app = FastAPI()
sql_bank_manager = SQL_BANK_MANAGER()
database_manager = Database_Manager(sql_bank_manager)

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/transactions")    
async def get_transactions():
    return database_manager.get_transactions()

@app.post("/transactions")
async def add_transaction(amount,category,vendor,response: Response):
    try:
        database_manager.add_transaction(amount,category,vendor)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST
        )
    

@app.delete("/transactions")
async def delete_transaction(id):
    try:
        database_manager.delete_transaction(id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST
        )

@app.get("/breakdown")
async def get_breakdown():
    return database_manager.get_breakdown()

@app.get('/')
def root():
    return "Server is running"

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8003,reload=True)