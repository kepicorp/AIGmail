FROM python:latest
RUN apt-get update && apt-get install
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
RUN python install.py 
ENTRYPOINT ["python"]
CMD ["app.py"]
