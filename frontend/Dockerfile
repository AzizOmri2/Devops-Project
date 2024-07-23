#Stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#Stage 2
<<<<<<< HEAD
FROM nginx:apline
COPY --from=node /app/dist/frontend /usr/share/nginx/html
=======
FROM nginx:alpine
COPY --from=node /app/dist/frontend /usr/share/nginx/html
>>>>>>> 5ba0c3e914cef5bff492f94d62d201d5a8465e1f
