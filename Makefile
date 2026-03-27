SHELL := /bin/bash

SKILL_SOURCE := $(CURDIR)/public/SKILL.md
SKILL_DIR := $(CURDIR)/skill-folder

.PHONY: clawmem-install clawmem-publish

clawmem-install:
	@npm i -g clawhub

clawmem-publish:
	@set -euo pipefail; \
	if [ ! -f "$(SKILL_SOURCE)" ]; then \
		echo "Publish failed: could not find $(SKILL_SOURCE)"; \
		exit 1; \
	fi; \
	VERSION="$${VERSION:-}"; \
	if [ -z "$$VERSION" ]; then \
		read -r -p "Enter release version: " VERSION; \
	fi; \
	if [ -z "$$VERSION" ]; then \
		echo "Publish failed: VERSION cannot be empty"; \
		exit 1; \
	fi; \
	TOKEN="$${CLAWHUB_TOKEN:-}"; \
	if [ -z "$$TOKEN" ] && [ -f .env ]; then \
		set -a; \
		source .env; \
		set +a; \
		TOKEN="$${CLAWHUB_TOKEN:-}"; \
	fi; \
	if [ -z "$$TOKEN" ]; then \
		echo "Publish failed: CLAWHUB_TOKEN was not found in the environment or .env"; \
		exit 1; \
	fi; \
	rm -rf "$(SKILL_DIR)"; \
	mkdir -p "$(SKILL_DIR)"; \
	cp "$(SKILL_SOURCE)" "$(SKILL_DIR)/SKILL.md"; \
	clawhub login --token "$$TOKEN"; \
	clawhub publish "$(SKILL_DIR)" --slug ClawMem --name "ClawMem" --version "$$VERSION" --tags latest
