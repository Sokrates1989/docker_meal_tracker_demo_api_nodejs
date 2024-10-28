# Use official Node.js image.
FROM node:22-slim

# Set the working directory inside the container.
WORKDIR /code

# Copy package.json and package-lock.json before other files for better layer caching.
COPY package*.json ./

RUN npm install
COPY . .
CMD ["node", "index.js"]
