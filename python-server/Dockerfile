FROM python:3.11

WORKDIR /app 
RUN pip install --upgrade pip
# Cài thêm công cụ build cần thiết
 

# Copy và cài đặt Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5002
CMD ["python3", "main.py"]
