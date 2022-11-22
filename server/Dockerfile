FROM nginx:alpine
RUN apk update
RUN apk add nano
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
COPY admin.nginx.conf /etc/nginx/sites-available/admin.cdgroup-ae.com
RUN ln -s /etc/nginx/sites-available/admin.cdgroup-ae.com /etc/nginx/sites-enabled/admin.cdgroup-ae.com

# Setup frontend
COPY frontend.nginx.conf /etc/nginx/sites-available/cdgroup-ae.com
RUN ln -s /etc/nginx/sites-available/cdgroup-ae.com /etc/nginx/sites-enabled/cdgroup-ae.com