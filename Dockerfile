### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN node --max_old_space_size=8192
RUN npm run build 
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/app/dist/aston-villa-app /share/nginx/html