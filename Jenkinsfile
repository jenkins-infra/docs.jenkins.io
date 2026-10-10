/** Debugging for https://github.com/jenkins-infra/helpdesk/issues/5334 **/

// Container agent with 4 vCPUS/12 Gb limit
node('maven-25') {
  checkout scm
  // Run without NodeJs / NPM
  sh 'yamllint .'
}

// Container agent with 4 vCPUS/12 Gb limit
node('maven-25') {
  checkout scm
  sh 'npm ci'
  sleep 10
  // Run with NodeJs / NPM
  sh 'npm run lint --if-present'
}
