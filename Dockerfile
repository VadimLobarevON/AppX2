# Use an official Node runtime as a parent image
FROM node:14-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the app's source code
COPY . ./

# Build the React app
RUN npm run build

# Use nginx to serve the build files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
