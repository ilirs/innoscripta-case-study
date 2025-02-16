# React App Docker Setup with Node.js 20.0.0

This project uses Node.js **20.0.0** and is containerized with Docker.

## Prerequisites

- Install [Docker](https://www.docker.com/).

## Steps to Run the Project

### Using Docker

1. Build the Docker image:

   ```bash
   docker build -t innoscripta-react .

   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 innoscripta-react
   ```

Check: http://localhost:3000.
