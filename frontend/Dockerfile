# Sử dụng Node.js base image
FROM node:18

# Set thư mục làm việc trong container
WORKDIR /app

# Copy package và cài đặt
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code
COPY . .

# Expose cổng mà backend chạy
EXPOSE 3000

# Lệnh chạy server
CMD ["npm", "start"]
