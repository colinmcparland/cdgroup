FROM php:7.1-alpine
ARG DEV
RUN apk update
RUN apk add nano php7-fpm php7-bcmath php7-curl php7-imagick php7-intl php7-json php7-mbstring php7-mysqli php7-xml php7-zip php7-session
WORKDIR /admin
ADD . .

# Setup permissions
RUN adduser cdg -D
RUN find /admin -type f -exec chmod 644 {} \;
RUN find /admin -type d -exec chmod 775 {} \;
RUN chown -R cdg:cdg /admin

# Configure php-fpm
RUN sed -i 's/listen = 127.0.0.1:9000/listen = admin:9000/g' /etc/php7/php-fpm.d/www.conf
RUN sed -i 's/listen = 127.0.0.1:9000/listen = admin:9000/g' /etc/php7/php-fpm.d/www.conf
RUN sed -i 's/;clear_env = no/clear_env = no/g' /etc/php7/php-fpm.d/www.conf
RUN sed -i 's/user = nobody/user = cdg/g' /etc/php7/php-fpm.d/www.conf
RUN sed -i 's/group = nobody/group = cdg/g' /etc/php7/php-fpm.d/www.conf

# Configure Wordpress
RUN if [ "$DEV" = 'true' ] ; then \
    echo "define('WP_DEBUG', true);" >> wp-config.php;\
    echo "define('FORCE_SSL_ADMIN', false);" >> wp-config.php;\
    echo -e 'define("FORCE_SSL_LOGIN", false);\n\n' >> wp-config.php;\
    else \
    echo -e 'define("WP_DEBUG", false);\n\n' >> wp-config.php;\
    fi

RUN curl https://api.wordpress.org/secret-key/1.1/salt/ >> /admin/wp-config.php

RUN echo -e 'if ( !defined("ABSPATH") ) {\n'\
    'define("ABSPATH", dirname(__FILE__) . "/");\n'\
    '}\n\n'\
    'require_once(ABSPATH . "wp-settings.php");\n' >> wp-config.php

EXPOSE 9000
