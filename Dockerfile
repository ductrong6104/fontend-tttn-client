# Sử dụng image Node.js chính thức
FROM node:18

# Set working directory
WORKDIR /app

# Sao chép chỉ các tệp cần thiết để chạy ứng dụng
COPY package*.json ./
RUN npm install --production

# Sao chép thư mục .next từ nơi bạn đã build vào container
COPY .next .next
# Sao chép các tệp cần thiết khác (nếu có)
COPY public public
COPY next.config.mjs next.config.mjs


# Expose port mà ứng dụng sẽ chạy
EXPOSE 4000

# Lệnh để start ứng dụng trên cổng 4000
CMD ["sh", "-c", "PORT=4000 npm run start"]
