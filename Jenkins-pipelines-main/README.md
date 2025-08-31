# 🚀 Jenkins Pipeline Node.js Web App

A simple Node.js + Express web application containerized using Docker and ready for CI/CD automation with Jenkins Pipelines.
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## 🛠️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Jenkins](https://www.jenkins.io/) (for CI/CD)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## 📜 Jenkinsfile

Jenkins  pipeline:

pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "athithyan402/myapp:latest"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

  stage('Install Dependencies') {
      steps {
        bat 'npm install'
      }
    }
    stage('Test') {
      steps {
        bat 'npm test'
      }
    }
    stage('Build Docker Image') {
      steps {
        bat "docker build -t %DOCKER_IMAGE% ."
      }
    }
    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials-id', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          bat "docker login -u %USERNAME% -p %PASSWORD%"
          bat "docker push %DOCKER_IMAGE%"
        }
      }
    }
  }
}


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## 📜 package.json

{
  "name": "jenkins-pipeline-app",
  "version": "1.0.0",
  "description": "A simple Node.js web app",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"No tests specified\" && exit 0"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## 🧠 index.js
javascript
Copy
Edit
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('🚀 Hello from Jenkins Docker Web App!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}');
});

## 🐋 Dockerfile
dockerfile
Copy
Edit
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 💻 Run Locally

1. Clone the repository

git clone https://github.com/ATHITHYAN-V/Jenkins-pipelines.git

cd Jenkins-pipelines

2. Install dependencies
   
npm install

4. Start the application

npm start

5. Open in browser
   
Visit: http://localhost:3000

# DockerHub

![DockerHub](https://github.com/user-attachments/assets/3f566158-897e-48da-a80f-8d56d5f006c3)

# Jenkins-Pipeline

![Jenkins-pipeline](https://github.com/user-attachments/assets/832d5a34-fe32-4b63-b627-cb107e9fb817)


