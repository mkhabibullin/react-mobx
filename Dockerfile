# base image
FROM node:latest

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
ADD . /usr/src/app
RUN npm install 
RUN npm run build

EXPOSE 3000

# start app
ENTRYPOINT ["npm", "start"]