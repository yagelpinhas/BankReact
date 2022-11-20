
from fastapi import APIRouter, Response, Request, status, HTTPException
from DB.Database_Manager import Database_Manager
from DB.SQL_Bank_Manager import SQL_BANK_MANAGER
import pydantic

router = APIRouter()
sql_bank_manager = SQL_BANK_MANAGER()
database_manager = Database_Manager(sql_bank_manager)

@router.get("/balance")
async def get_balance():
    return database_manager.get_balance()

@router.get("/getamount/{id}")
async def get_balance(id):
    return database_manager.get_amount(id)

@router.get("/transactions")    
async def get_transactions():
    return database_manager.get_transactions()

@router.post("/transactions")
async def add_transaction(request: Request,response: Response):
    try:
        req = await request.json()
        database_manager.add_transaction(req["amount"],req["category"],req["vendor"])
        database_manager.plus_balance(req["amount"])
        response.status_code=status.HTTP_201_CREATED
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST
        )
    

@router.delete("/transactions/{id}")
async def delete_transaction(id,response: Response):
    try:
        amount = database_manager.get_amount(id)
        database_manager.delete_transaction(id)
        database_manager.minus_balance(amount)
        response.status_code=status.HTTP_204_NO_CONTENT
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST
        )

@router.get("/breakdown")
async def get_breakdown():
    return database_manager.get_breakdown()
