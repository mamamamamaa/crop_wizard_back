build:
	docker build -t crop_back .

run:
	docker run -d -p 9999:9999 --name crop_back --rm crop_back

stop:
	docker stop crop_back