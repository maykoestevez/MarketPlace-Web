FROM node:latest AS build
WORKDIR /usr/local/app
COPY ./ /usr/local/app
RUN npm install
RUN npm run build

FROM nginx:latest
COPY ./default.conf /etc/nginx/conf.d
COPY --from=build /usr/local/app/dist/marketplace-web /usr/share/nginx/html
EXPOSE 80  