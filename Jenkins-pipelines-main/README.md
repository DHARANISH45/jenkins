# 🚀 Jenkins Pipeline Node.js Web App

This project demonstrates a **Node.js + Express web application** containerized with **Docker** and automated using a **Jenkins Declarative Pipeline** for CI/CD.

---

## 🛠️ Prerequisites

Before you begin, ensure the following are installed and running:

* [Node.js](https://nodejs.org/) (v18 or later)
* [Docker](https://www.docker.com/)
* [Jenkins](https://www.jenkins.io/) with:

  * **Pipeline Plugin**
  * **Docker installed on Jenkins host**
  * **DockerHub credentials** added in Jenkins (ID: `docker`)

---

## 📂 Project Structure

```
.
├── Dockerfile
├── Jenkinsfile
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 📜 Jenkinsfile (Pipeline Script)

This pipeline performs:

1. **Checkout** → Clones source code from GitHub
2. **Build** → Creates Docker image
3. **Login** → Authenticates with DockerHub
4. **Push** → Pushes the built image to DockerHub

```groovy
pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker')
        IMAGE_NAME = "dharanish45/my-app"
        IMAGE_TAG = "v1"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/DHARANISH45/jenkins.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "🛠️ Building Docker Image..."
                    DOCKER_BUILDKIT=0 docker build -t $IMAGE_NAME:$IMAGE_TAG ./Jenkins-pipelines-main
                '''
            }
        }

        stage('Docker Login') {
            steps {
                sh '''
                    echo "🔑 Logging into DockerHub..."
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                sh '''
                    echo "📤 Pushing Docker Image to DockerHub..."
                    docker push $IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Build and Push Successful!"
        }
        failure {
            echo "❌ Build Failed! Check logs above."
        }
    }
}
```

---

## 📦 package.json

```json
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
```

---

## 🧑‍💻 index.js

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('🚀 Hello from Jenkins Docker Web App!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
```

---

## 🐋 Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

---

## 💻 Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/DHARANISH45/jenkins.git
   cd jenkins
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npm start
   ```

4. Open in browser:
   👉 [http://localhost:3000](http://localhost:3000)

---

## 🐳 Build & Run with Docker

```bash
docker build -t dharanish45/my-app:v1 .
docker run -p 3000:3000 dharanish45/my-app:v1
```

Open 👉 [http://localhost:3000](http://localhost:3000)

---

## 🔗 Jenkins CI/CD Pipeline

This project is configured to automatically:

* Pull code from GitHub
* Build a Docker image
* Push image to **DockerHub**

![Jenkins Pipeline](https://github.com/user-attachments/assets/832d5a34-fe32-4b63-b627-cb107e9fb817)

---

## 📤 DockerHub Repository

Your images will appear in your DockerHub repo:
👉 [https://hub.docker.com/repository/docker/dharanish45/my-app](https://hub.docker.com/repository/docker/dharanish45/my-app)

---

✨ With this setup, every commit can trigger a full build, test, and deploy pipeline automatically!

---
