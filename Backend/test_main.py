from http import client
from urllib import response
from fastapi.testclient import TestClient
import requests
from main import app


client = TestClient(app)

async def test_getAllTodos():
    response = await client.get("/api/v1/todo")
    assert  response.status_code == 200

async def test_getTodoByTitle(title):
    response = await client.get("/api/v1/todo/{0}".format(title))
    assert  response.status_code == 200

async def test_postCreateNewTodo():
    response = await client.post("/api/v1/todo")
    assert  response.status_code == 200

async def test_putUpdateTodo(title, todo):
    response = await client.put("/api/v1/todo/{0}".format(title), json=todo)
    assert  response.status_code == 200

async def test_deleteTodoByTitle(title):
    response = await client.delete("/api/v1/todo/{0}".format(title))
    assert  response.status_code == 200