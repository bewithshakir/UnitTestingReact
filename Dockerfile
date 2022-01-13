FROM node:17-alpine
WORKDIR /app
COPY package.json ./
#COPY yarn.lock ./
#RUN yarn install
RUN npm install
COPY . .
EXPOSE 3000
ENV GENERATE_SOURCEMAP=false
CMD [ "node", "app.js"]