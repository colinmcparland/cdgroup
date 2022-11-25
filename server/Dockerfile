FROM nginx:alpine
RUN apk update
RUN apk add nano
ARG FRONTEND_HOSTNAME
ARG ADMIN_HOSTNAME
COPY . .

# Disable the default nginx conf
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.disabled

# Add our custom nginx conf so we can use sites_enabled dir
RUN rm /etc/nginx/nginx.conf && mv nginx.conf /etc/nginx/nginx.conf

# Create sites-available and sites-enabled directories for cleaner server config
RUN mkdir /etc/nginx/sites-available
RUN mkdir /etc/nginx/sites-enabled
RUN touch /etc/nginx/sites-available

# Setup admin
COPY admin.nginx.conf /etc/nginx/sites-available/$ADMIN_HOSTNAME
RUN sed -i "s#REPLACE_ME_WITH_FRONTEND_HOSTNAME#$FRONTEND_HOSTNAME#g" "/etc/nginx/sites-available/$ADMIN_HOSTNAME"
RUN sed -i "s#REPLACE_ME_WITH_ADMIN_HOSTNAME#$ADMIN_HOSTNAME#g" "/etc/nginx/sites-available/$ADMIN_HOSTNAME"
RUN ln -s "/etc/nginx/sites-available/$ADMIN_HOSTNAME" "/etc/nginx/sites-enabled/$ADMIN_HOSTNAME"

# Setup frontend
COPY frontend.nginx.conf /etc/nginx/sites-available/$FRONTEND_HOSTNAME
RUN sed -i "s#REPLACE_ME_WITH_HOSTNAME#$FRONTEND_HOSTNAME#g" "/etc/nginx/sites-available/$FRONTEND_HOSTNAME"
RUN ln -s "/etc/nginx/sites-available/$FRONTEND_HOSTNAME" "/etc/nginx/sites-enabled/$FRONTEND_HOSTNAME"