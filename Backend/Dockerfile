FROM python:3.9

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./main.py .

COPY ./model.py .

COPY ./database.py .

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]

