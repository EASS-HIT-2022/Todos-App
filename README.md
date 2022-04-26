
# Todo's App 


Welcome to Todo's App! 
This app will help you to manage your time effectively, by this app you will not forget any task you have todo.


## Installation

For run this app, please follow the steps below:

1. Clone the repo localy:
```bash
 git clone https://github.com/EASS-HIT-2022/Todos-App.git
```
2. build the docker:
```bash
cd {your_path}/Todos-App/Backend
docker build . -t todos-app
```

3. Run the docker:
```bash
 docker run -d --name todos-app-con -p 8090:8080 todos-app
```

4. All set, you can connect to the link http://localhost:8090/docs

5. For testing, please run docker exec -ti todos-app-con bash

6. Run the command pytest


## Functionality

- Add a new Todo's tasks
- Delete Todo's tasks by title
- Update Todo's tasks by title
- Get all your Todo's tasks
- Get one Todo's task by title


## Contact 

- Yarden Gispan ~ Github profile: [@yargisp](https://github.com/yargisp) ~ Mail address:yargisp@gmail.com

