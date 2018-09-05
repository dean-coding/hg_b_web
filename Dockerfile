FROM nginx:1.13
COPY ./dist /usr/share/nginx/html
COPY ./nginx/nginx.hg.default.conf /etc/nginx/conf.d/default.conf