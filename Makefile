NAME=quizzical

.PHONY: up down build restart logs status db shell-backend shell-frontend clean

# Start containers
up:
	docker compose up -d

# Stop containers (preserve database)
down:
	docker compose down

# Build and start containers
build:
	docker compose up --build -d

# Restart containers
restart:
	docker compose restart

# Follow all logs
logs:
	docker compose logs -f

# Show container status
status:
	docker compose ps

# Open PostgreSQL shell
db:
	docker compose exec db psql -U postgres -d $(NAME)

# Open backend shell
shell-backend:
	docker compose exec backend sh

# Open frontend shell
shell-frontend:
	docker compose exec frontend sh

# Stop containers and delete database volume (DANGEROUS)
clean:
	docker compose down -v
