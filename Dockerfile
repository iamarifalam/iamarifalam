FROM python:3.11-slim

WORKDIR /app

COPY pyproject.toml .
COPY agentic_routing ./agentic_routing
COPY tests ./tests

RUN pip install --no-cache-dir .[dev]

CMD ["pytest", "tests/"]
