FROM node

WORKDIR /app

COPY . .

RUN npm install -g @nestjs/cli

RUN npm install

CMD ["nest", "start"]