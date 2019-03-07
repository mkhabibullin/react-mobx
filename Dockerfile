FROM stefanscherer/node-windows
#USER node
#WORKDIR /app

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Expose port for service
EXPOSE 3000

# Copy source code to image
COPY . .

# Install dependencies
RUN npm install
RUN npm run build
#RUN C:\nodejs\npm.cmd -v

# Build app and start server from script
ENTRYPOINT ["nodejs\\npm.cmd", "run startProd"]

# ==========================================================
# # base image
# FROM node:latest

# # set working directory
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app

# # add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# # install and cache app dependencies
# ADD . /usr/src/app
# RUN npm install 
# RUN npm run build

# EXPOSE 3000

# # start app
# ENTRYPOINT ["npm", "run", "startProd"]
# ==========================================================