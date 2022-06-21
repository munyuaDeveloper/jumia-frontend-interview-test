#stage 1
FROM node:14.17.0 as jumia-test
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
#stage 2
FROM nginx:alpine
COPY --from=jumia-test /app/dist/jumia-test /usr/share/nginx/html

EXPOSE 80
