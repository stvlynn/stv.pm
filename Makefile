.PHONY: help install dev build lint preview check clean reinstall

APP_DIR := portfolio
NPM := npm --prefix $(APP_DIR)

help: ## Show available commands
	@awk 'BEGIN {FS = ":.*##"; printf "\nAvailable commands:\n"} /^[a-zA-Z_-]+:.*?##/ {printf "  make %-12s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install app dependencies
	$(NPM) install

dev: ## Start the Vite development server
	$(NPM) run dev

build: ## Build the production bundle
	$(NPM) run build

lint: ## Run ESLint
	$(NPM) run lint

preview: ## Preview the production build
	$(NPM) run preview

check: lint build ## Run lint and production build

clean: ## Remove generated build artifacts
	rm -rf $(APP_DIR)/dist

reinstall: ## Reinstall dependencies from scratch
	rm -rf $(APP_DIR)/node_modules
	$(NPM) install
