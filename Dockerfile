FROM node:16-alpine
WORKDIR /
COPY . .
RUN cd backend && npm i
WORKDIR /backend
EXPOSE 8080
CMD ["node", "server"]
