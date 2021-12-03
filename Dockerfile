FROM node:latest
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
ENV GENERATE_SOURCEMAP=false
CMD [ "yarn", "start-docker"]