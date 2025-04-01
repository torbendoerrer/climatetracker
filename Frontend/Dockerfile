FROM node:18.12.1-alpine AS builder

LABEL version="1.0.0"
LABEL description="climate tracker frontend"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build


FROM nginx:stable-alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENV NODE_ENV=production

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
