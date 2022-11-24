FROM php:7.1-alpine
RUN apk update
RUN apk add npm composer php7-fpm nano php7-session php7-tokenizer php7-fileinfo
WORKDIR /cdg
ADD . .
ARG MIX_ADMIN_HOST
ARG DEV

# Generate an app key
RUN touch .env

# Build dependencies if we are on production
# Locally, we will have a bind mount to the host, so we can use local dependencies
RUN if [ "$DEV" != 'true' ] ; then \
    # set the Mix variables so js can compile
    echo MIX_ADMIN_HOST="$MIX_ADMIN_HOST" >> .env; \
    # Install NPM packages
    npm install; \
    # Install composer packages \
    composer install; \
    # Build the production JS
    npm run prod; \
    # Generate the app key
    echo APP_KEY= >> .env; \
    php artisan key:generate --force; \
fi

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
