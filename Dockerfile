FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/agile-deck-angular /usr/share/nginx/html

ENTRYPOINT ["nginx","-g","daemon off;"]
