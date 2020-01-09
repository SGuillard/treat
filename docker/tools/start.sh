#!/bin/bash
sh clean-docker.sh
cd ..
docker-compose stop
docker-compose up --build -d
#cd tools/
#sh php.sh
