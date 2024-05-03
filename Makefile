ROOT_DIR=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# Build everything after cleaning
all:	clean	ui	antora

# Rule to build the UI before building the docs
ui:
	@echo "Building UI"
	cd $(ROOT_DIR)/ui && npm i && npx gulp bundle

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

# Show this help message.
help:
	@awk '/^#/{c=substr($$0,3);next}c&&/^[[:alpha:]][[:alnum:]_-]+:/{print substr($$1,1,index($$1,":")),c}1{c=0}' $(MAKEFILE_LIST) | column -s: -t | sort
