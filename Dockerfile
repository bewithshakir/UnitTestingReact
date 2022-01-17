#build environment
FROM node:17-alpine3.15 as builder
RUN apk --no-cache add --update \
    python3 py3-pip make g++ \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*
WORKDIR /app
COPY . .
ENV PATH /app/node_modules/.bin:$PATH /env/bin/python:$PATH
CMD ["/env/bin/python", "main.py"]
RUN yarn
RUN yarn build

#production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx" , "-g" , "daemon off;"]