# ==============================================================================
# Agentic Routing Framework - Developer Makefile
# FAANG-grade development automation: build, test, lint, release, docker
# ==============================================================================

.PHONY: help install dev test test-cov lint format typecheck clean build docker-build docker-run security-scan all

PYTHON        := python3
PIP           := pip
PKG           := agentic_routing
TESTS         := tests/
DOCKER_IMAGE  := agentic-routing:latest

help:  ## Show all available commands
	@echo ""
	@echo "  ██████╗ ██████╗ ███████╗███╗   ██╗████████╗██╗ ██████╗"
	@echo " ██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝██║██╔════╝"
	@echo " ███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║   ██║██║     "
	@echo " ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║   ██║██║     "
	@echo " ██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   ██║╚██████╗"
	@echo " ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝ ╚═════╝"
	@echo ""
	@echo "Agentic Routing Framework — Developer Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""

install:  ## Install production dependencies
	$(PIP) install -e .

dev:  ## Install all development dependencies
	$(PIP) install -e ".[dev]"
	$(PIP) install pre-commit ruff mypy black
	pre-commit install

test:  ## Run the full test suite
	pytest $(TESTS) -v

test-cov:  ## Run tests with full coverage report
	pytest $(TESTS) -v --cov=$(PKG) --cov-report=term-missing --cov-report=html
	@echo "Coverage HTML report: htmlcov/index.html"

lint:  ## Run Ruff linter
	ruff check $(PKG)/ $(TESTS)/

format:  ## Auto-format code with black
	black $(PKG)/ $(TESTS)/

format-check:  ## Check code formatting without changing files
	black --check $(PKG)/ $(TESTS)/

typecheck:  ## Run mypy static type checker
	mypy $(PKG)/ --ignore-missing-imports

clean:  ## Remove build artifacts and cache files
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "htmlcov" -exec rm -rf {} + 2>/dev/null || true
	find . -name "*.pyc" -delete 2>/dev/null || true
	@echo "Cleaned up build artifacts."

build:  ## Build Python wheel and sdist distribution packages
	$(PYTHON) -m build
	@echo "Distributions ready in dist/"

docker-build:  ## Build Docker container image
	docker build -t $(DOCKER_IMAGE) .

docker-run:  ## Run tests inside Docker container
	docker run --rm $(DOCKER_IMAGE)

security-scan:  ## Run pip-audit vulnerability scanner
	pip install pip-audit
	pip-audit

benchmark:  ## Run performance benchmarks
	$(PYTHON) -c "from agentic_routing import AgentRouter, AsyncAgentRouter; import time; r=AgentRouter(); [r.route_query('test query') for _ in range(1000)]; print('1000 sync routes: done')"

all: clean dev lint typecheck test build  ## Run full CI pipeline locally
	@echo "✅ Full local CI pipeline passed!"
