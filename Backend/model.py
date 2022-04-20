from pydantic import BaseModel
import datetime
from enum import Enum
class TodoStatus(str, Enum):
    todo = 'todo'
    doing = 'doing'
    done = 'done'

class Todo(BaseModel):
    title: str
    description: str
    status: TodoStatus = TodoStatus.todo
    created_at: datetime.datetime = datetime.datetime.now()