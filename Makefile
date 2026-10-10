.PHONY: install dev build check test lint format help

install: ## Install dependencies
	@pnpm install

dev: ## Start the dev server on http://localhost:3000
	@pnpm dev

build: ## Production build (needs UNSPLASH_ACCESS_KEY and network access to the blog)
	@pnpm build

check: ## Typecheck, lint and test
	@pnpm check

test: ## Run unit tests
	@pnpm test

lint: ## Run ESLint (includes FSD/DDD import boundaries)
	@pnpm lint

format: ## Format with Prettier
	@pnpm format

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-12s %s\n", $$1, $$2}'
