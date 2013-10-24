#!/bin/bash

_ROOT=$(git rev-parse --show-toplevel)

echo "Installing Nginx..."
sudo apt-get install nginx

echo "Configuring Nginx..."

#remove original entries and replace with our own
cd /etc/nginx/
sudo rm -r sites-available
sudo ln -s /etc/nginx/sites-enabled /etc/nginx/sites-available
cd sites-enabled
sudo rm default default_original
sudo cp ${_ROOT}"/env/default" default

# make wwwroot and
# link to our git checkout

sudo mkdir --parents /var/www/
cd ${_ROOT}
sudo rm -Rf /var/www/default
sudo ln -s ${PWD} /var/www/default
sudo chown -R $USER:$USER /var/www/default
sudo chmod 755 /var/www
sudo service nginx restart

echo "Finished configuring Nginx"
echo "Getting dependancies..."

cd ${_ROOT}; sudo ./depends.sh

sudo apt-get install chromium-browser

chromium-browser "localhost"


