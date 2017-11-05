FROM node:8.8.1

WORKDIR /src

COPY package.json .
RUN npm i

COPY src .

EXPOSE 3000
RUN ls

CMD ["node", "index.js"]