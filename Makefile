all:
	MODE="start" docker-compose up

dev:
	MODE="dev" docker-compose up

build:
	MODE=${MODE} docker-compose up --build