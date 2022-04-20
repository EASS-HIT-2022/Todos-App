from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Todo

from database import (
    pullOneTodo,
    pullAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)


@app.get("/api/v1/todo")
async def get_todo():
    response = await pullAllTodos()
    return response

@app.get("/api/v1/todo/{title}", response_model=Todo)
async def get_todo_by_title(title):
    response = await pullOneTodo(title)
    return response
   

@app.post("/api/v1/todo/", response_model=Todo)
async def post_todo(todo: Todo):
    response = await createTodo(todo)
    return response

@app.put("/api/v1/todo/{title}/", response_model=Todo)
async def put_todo(title: str,request: Todo):
    response = await updateTodo(title, request)
    return response

@app.delete("/api/v1/todo/{title}")
async def delete_todo(title):
    response = await deleteTodo(title)
    return Todo(**response[0])