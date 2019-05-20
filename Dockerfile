FROM node:10

# Setting working directory. All the paths will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Building the app
RUN npm run build

# Exposing default port
EXPOSE 3000

# Running the app
CMD [ "npm", "start" ]
