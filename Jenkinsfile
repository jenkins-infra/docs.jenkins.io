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
        sh '''
        curl -qsL https://github.com/crate-ci/typos/releases/download/v1.5.0/typos-v1.5.0-x86_64-unknown-linux-musl.tar.gz | tar xvzf - ./typos
        curl -qsL https://github.com/halkeye/typos-json-to-checkstyle/releases/download/v0.1.1/typos-checkstyle-v0.1.1-x86_64 > typos-checkstyle && chmod 0755 typos-checkstyle
        ./typos --format json | ./typos-checkstyle - > checkstyle.xml || true
        '''
      }
      post {
        always {
          recordIssues(tools: [checkStyle(id: 'typos', name: 'Typos', pattern: 'checkstyle.xml')])
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
  }
}
