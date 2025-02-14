# Use Node.js 20.0.0 as the base image
FROM node:20.0.0-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Serve the built app with a lightweight HTTP server
RUN npm install -g serve

# Expose port 3000 for the server
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]
