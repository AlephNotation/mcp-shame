FROM oven/bun:1

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .



# Move to the data directory for SQLite
ENV SQLITE_DB_PATH=/app/data/shames.sqlite

# Expose the port
EXPOSE 3000

# Start the server
CMD ["bun", "start"]