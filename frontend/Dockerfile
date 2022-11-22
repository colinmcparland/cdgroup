FROM php:7.1-alpine
RUN apk update
RUN apk add npm composer php7-fpm nano php7-session php7-tokenizer php7-fileinfo
WORKDIR /cdg
ADD . .

# Install NPM packages and build the production app
RUN npm install
RUN npm rebuild node-sass
RUN npm run prod

# Install composer packages
RUN composer install

# Generate an app key
RUN touch .env
RUN php artisan key:generate

# Setup permissions
RUN adduser cdg -D
RUN find /cdg -type f -exec chmod 644 {} \;
RUN find /cdg -type d -exec chmod 775 {} \;
RUN chown -R cdg:cdg /cdg

# Configure php-fpm
RUN sed -i 's/listen = 127.0.0.1:9000/listen = frontend:9000/g' /etc/php7/php-fpm.d/www.conf
RUN sed -i 's/listen = 127.0.0.1:9000/listen = frontend:9000/g' /etc/php7/php-fpm.d/www.conf
RUN sed -i 's/;clear_env = no/clear_env = no/g' /etc/php7/php-fpm.d/www.conf
RUN sed -i 's/user = nobody/user = cdg/g' /etc/php7/php-fpm.d/www.conf
RUN sed -i 's/group = nobody/group = cdg/g' /etc/php7/php-fpm.d/www.conf

EXPOSE 9000
