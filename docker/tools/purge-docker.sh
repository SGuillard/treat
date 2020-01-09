#!/bin/bash
sh clean-docker.sh
docker rmi $(docker images -q)
