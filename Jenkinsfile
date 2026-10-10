/** Debugging for https://github.com/jenkins-infra/helpdesk/issues/5334 **/

// Container agent with 4 vCPUS/12 Gb limit
node('maven-25') {
  // Run without NodeJs / NPM
  sh 'yamllint .'
}

// Container agent with 4 vCPUS/12 Gb limit
node('maven-25') {
  // Run without NodeJs / NPM
  sh 'npm run lint --if-present'
}
