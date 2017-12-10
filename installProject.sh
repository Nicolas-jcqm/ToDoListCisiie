#!/bin/bash

cd jsserver
composer install

cd ..
php -S localhost:8081