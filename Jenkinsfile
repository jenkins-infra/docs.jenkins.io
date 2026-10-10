/** Debugging for https://github.com/jenkins-infra/helpdesk/issues/5334 **/

// Container agent with 4 vCPUS/12 Gb limit
node('jnlp-maven-25') {
  // Run without NodeJs / NPM
  sh 'yamllint .'
}
