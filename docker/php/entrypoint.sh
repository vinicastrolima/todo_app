#!/bin/bash

# Corrige permissões necessárias para Laravel
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

exec php-fpm
