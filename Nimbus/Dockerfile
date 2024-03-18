# Use the official Node.js 14 image as the base image
FROM node:20
# Set the working directory inside the container
RUN npm i -g yarn typescript ts-node
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the server will be running on
EXPOSE 3000

# Start the server
CMD ["yarn", "server"]