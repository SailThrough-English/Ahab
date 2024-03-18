# Use the official Hugo image as the base image
FROM klakegg/hugo:0.88.1-ext-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Hugo site to the working directory
COPY . .

# Expose the default Hugo server port
EXPOSE 1313

# Start the Hugo server
CMD ["hugo", "server", "--bind", "0.0.0.0"]