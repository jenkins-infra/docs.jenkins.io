ROOT_DIR=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# Build everything after cleaning
all:	clean	ui	antora

install:
	npm i -g @antora/cli@3.1 @antora/site-generator@3.1.5
	npm i -g gulp
	npm i -g http-server

# Rule to build the UI before building the docs
ui:	install
	@echo "Building UI"
	cd $(ROOT_DIR)/ui && npm i && gulp bundle

# Rule to build the Antora documentation
antora:
	@echo "Building documentation"
	cd $(ROOT_DIR)/playbook && npm i
	cd $(ROOT_DIR)/playbook && npx antora --fetch local-antora-playbook.yml
	cd $(ROOT_DIR)/playbook && npx http-server build/site -c-1
	@echo "Antora site is up"

# Rule to clean cache
clean:
	rm -rf ui/build
	rm -rf playbook/build
