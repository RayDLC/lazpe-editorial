FROM node:20.10.0-alpine3.19 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --frozen-lockfile

FROM node:20.10.0-alpine3.19 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:1.25.4 as prod
EXPOSE 80

COPY --from=builder /app/dist/libros-app /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
CMD ["nginx", "-g", "daemon off;"]