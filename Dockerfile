FROM node:alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install -g @angular/cli
RUN npm install
CMD ["ng", "serve", "--host", "0.0.0.0"]
#CMD ["ionic", "serve", "--host", "0.0.0.0"] puerto en 8100, 4200
# se levanta con sudo docker --name appointments -p 4200:4200 appointments. con ionic serve en cmd no funciona
