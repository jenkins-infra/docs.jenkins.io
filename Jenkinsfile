pipeline {
  options {
    timeout(time: 60, unit: 'MINUTES')
    ansiColor('xterm')
    disableConcurrentBuilds(abortPrevious: true)
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '5', numToKeepStr: '5')
  }

  agent {
    label 'linux-arm64 || arm64linux'
  }

  stages {
    stage('Check for typos') {
      steps {
        sh 'typos --format sarif > typos.sarif || true'
      }
      post {
        always {
          recordIssues(tools: [sarif(id: 'typos', name: 'Typos', pattern: 'typos.sarif')])
        }
      }
    }

    stage('Install dependencies') {
      environment {
        NODE_ENV = 'development'
      }
      steps {
        sh '''
        asdf install
        npm install
        npm run install-subfolders
        '''
      }
    }

    stage('Build') {
      steps {
        sh '''
        npm run build-ui
        npm run build-antora
        '''
      }
    }

    stage('Deploy PR to preview site') {
      when {
        allOf{
          changeRequest target: 'main'
          // Only deploy from infra.ci.jenkins.io
          expression { infra.isInfra() }
        }
      }
      environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
      }
      steps {
        sh 'netlify-deploy --draft=true --siteName "docs-jenkins-io" --title "Preview deploy for ${CHANGE_ID}" --alias "deploy-preview-${CHANGE_ID}" -d ./playbook/build/site'
      }
      post {
        success {
          recordDeployment('jenkins-infra', 'docs.jenkins.io', pullRequest.head, 'success', "https://deploy-preview-${CHANGE_ID}--docs-jenkins-io.netlify.app")
        }
        failure {
          recordDeployment('jenkins-infra', 'docs.jenkins.io', pullRequest.head, 'failure', "https://deploy-preview-${CHANGE_ID}--docs-jenkins-io.netlify.app")
        }
      }
    }

    stage('Deploy to production') {
      when {
        allOf{
          expression { env.BRANCH_IS_PRIMARY }
          // Only deploy from infra.ci.jenkins.io
          expression { infra.isInfra() }
        }
      }
      steps {
        script {
          infra.withFileShareServicePrincipal([
            servicePrincipalCredentialsId: 'infraci-docs-jenkins-io-fileshare-service-principal-writer',
            fileShare: 'docs-jenkins-io',
            fileShareStorageAccount: 'docsjenkinsio'
          ]) {
            sh '''
            # Synchronize the File Share content
            set +x
            azcopy sync \
              --skip-version-check \
              --recursive=true \
              --delete-destination=true \
              ./playbook/build/site/ "${FILESHARE_SIGNED_URL}"
            '''
          }
        }
      }
    }
  }
}
