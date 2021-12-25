FROM node:12
WORKDIR /app/acme_frontend/
COPY package.json /app/acme_frontend/package.json
RUN npm install
RUN npm install -g @angular/cli
COPY . /app/acme_frontend/
EXPOSE 4200
CMD ng serve --host 0.0.0.0