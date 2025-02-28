#! /bin/bash

docker build . -t frontend_case

echo "Launching app at http://localhost:3000"

docker run -p 127.0.0.1:3000:3000 frontend_case