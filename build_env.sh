#!/bin/bash

_ROOT=$(git rev-parse --show-toplevel)
_USER=(`echo ${PWD#*/} | tr "/" "\n"`)   

apt-get install nginx
cd /etc/nginx/

apt-get install chromium-browser

su ${_USER[1]}
chromium-browser "localhost"


