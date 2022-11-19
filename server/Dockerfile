FROM nginx:alpine
RUN apk update
RUN apk add nano
COPY . .
RUN rm /etc/nginx/nginx.conf && mv nginx.conf /etc/nginx/nginx.conf
RUN mkdir /etc/nginx/sites-available
RUN mkdir /etc/nginx/sites-enabled
RUN touch /etc/nginx/sites-available
COPY frontend.nginx.conf /etc/nginx/sites-available/cdgroup-ae.com
RUN ln -s /etc/nginx/sites-available/cdgroup-ae.com /etc/nginx/sites-enabled/cdgroup-ae.com
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/defualt.conf.disabled