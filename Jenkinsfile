pipeline {
    agent any
    
    tools {
        jdk "jdk11"
        maven 'maven3'
    }
    
    environment {
        registryCredential = 'dockerhub'  // Ensure this matches the ID in Jenkins
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', credentialsId: '869292d9-f4ce-4a41-860a-0f135c10b623', url: 'https://github.com/AzizOmri2/Devops-Project.git'
            }
        }
        
        stage('Compile') {
            steps {
                sh "mvn clean compile -f backend/pom.xml"
            }
        }
        
        stage('Build And Test') {
            steps {
                sh 'mvn clean package -f backend/pom.xml'
            }
        }
        
        stage('Publish to Nexus Repository Manager') {
            steps {
                script {
                    nexusArtifactUploader artifacts: [[
                        artifactId: 'backend', 
                        classifier: '', 
                        file: 'backend/target/backend-0.0.1-SNAPSHOT.jar', 
                        type: 'jar'
                    ]], 
                    credentialsId: 'NEXUS_CRED', 
                    groupId: 'tn', 
                    version: '0.0.1-SNAPSHOT', 
                    repository: 'maven-central-repository',
                    nexusUrl: '203.0.113.21:8081', 
                    nexusVersion: 'nexus3', 
                    protocol: 'http'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Spring Docker Image from the specified Dockerfile
                    dockerImageSpring = docker.build("azizomri/spring-back", "backend/")
                    
                    // Build Angular Docker Image from the specified Dockerfile
                    dockerImageAngular = docker.build("azizomri/angular-front", "frontend/")
                }
            }
        }
        
        stage('Push Docker Image to DockerHub') {
            steps {
                script {
                    
                    docker.withRegistry('https://index.docker.io/v1/', registryCredential) {
                        // Push Spring Docker Image to DockerHub
                        dockerImageSpring.push("latest")
                        // Push Angular Docker Image to DockerHub
                        dockerImageAngular.push("latest")
                    }
                }
            }
        }
        
    }
}
