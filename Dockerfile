FROM nginx:latest

COPY ./nginx-host.conf /etc/nginx/conf.d/default.conf

COPY ./public /web/public

CMD ["nginx", "-g", "daemon off;"]
