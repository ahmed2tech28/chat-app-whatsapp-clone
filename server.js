import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  const socketMap = new Map();

  io.on("connection", (socket) => {
    const email = socket.handshake.query.email;
    socketMap.set(email, socket.id);
    socket.on("send:message", (data) => {
      const socketId = socketMap.get(data?.to);
      io.to(socketId).emit("recieve:message", data);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
