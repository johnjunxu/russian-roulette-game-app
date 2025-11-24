# Use a standard Nginx server for static content
FROM nginx:alpine

# Copy all game files to the web server's root directory
COPY . /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80
