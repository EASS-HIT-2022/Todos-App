import motor.motor_asyncio
from model import Todo
from fastapi import FastAPI, HTTPException

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://yargisp:Aa123456@cluster0.shzss.mongodb.net/test')
database = client.TodoList
collection = database.todo

async def createTodo(todo):
    task = await collection.find_one({"title": todo.title})
    if task:
        raise HTTPException(400, "This task is already exist")
    await collection.insert_one(todo.dict())
    return todo

async def pullOneTodo(title):
    task = await collection.find_one({"title": title})
    if not task:
        raise HTTPException(404, f"There is no todo with the title {title}")
    document = await collection.find_one({"title": title})
    return document

async def pullAllTodos():
    allTodosList = []
    allTodosInDB = collection.find({})
    async for document in allTodosInDB:
        allTodosList.append(Todo(**document))
    return allTodosList

async def updateTodo(title, request):
    task = await collection.find({"title": title}).to_list(None)
    if not task:
        raise HTTPException(404, f"There is no todo with the title {title}")
    await collection.update_one({"title": title}, {"$set": {"title": request.title ,"description": request.description}})
    return request

async def deleteTodo(title):
    task = await collection.find({"title": title}).to_list(None)
    if not task:
        raise HTTPException(404, f"There is no todo with the title {title}")
    await collection.delete_one({"title": title})
    return task