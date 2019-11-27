start:
	docker-compose up -d --build react-app
	docker-compose exec react-app npm start -- --host 0.0.0.0

sh:
	docker-compose up -d --build react-app
	docker-compose exec react-app sh