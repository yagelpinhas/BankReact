import pymysql
class Database_Manager:
    def __init__(self,bank_manager):
        self.bank_manager=bank_manager
    def get_transactions(self):
        return self.bank_manager.get_transactions()
    def add_transaction(self,amount,category,vendor):
        self.bank_manager.add_transaction(amount,category,vendor)
    def delete_transaction(self,id):
        self.bank_manager.delete_transaction(id)
    def get_breakdown(self):
        return self.bank_manager.get_breakdown()
    def get_balance(self):
        return self.bank_manager.get_balance()
    def plus_balance(self,amount):
        self.bank_manager.plus_balance(amount)
    def minus_balance(self,amount):
        self.bank_manager.minus_balance(amount)
    def get_amount(self,id):
        return self.bank_manager.get_amount(id)
