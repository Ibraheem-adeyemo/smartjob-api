FROM node:18

WORKDIR /app


# Copy application code
COPY . .

RUN npm install


RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Start the server by default, this can be overwritten at runtime
CMD [ "pm2", "run", "start" ]

# Start the application with PM2
# CMD ["pm2-runtime", "start", "ecosystem.config.js"]
