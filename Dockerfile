FROM node:latest
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 80
ENV GENERATE_SOURCEMAP=false
CMD [ "yarn", "build"]