@Library('pipeline-library@helpdesk5281-buildwebsite-always-install-dev-dependencies') _

buildWebsite([
  deployFolder: 'playbook/build/site',
  // TODO: lint all YAML files and remove the line below afterward to enable lint in CI
  lint: false,
  customEnvsDevelopment: ['NODE_ENV=production'],
])
