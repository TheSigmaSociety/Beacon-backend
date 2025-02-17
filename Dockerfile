# Use Node.js LTS version as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy source code
COPY . .

# Expose port
EXPOSE ${PORT}

# Remove ENV declarations as they will be handled by docker-compose

# Start the application
CMD ["npm", "start"]
