import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv"
import server from "./server";
dotenv.config();

const prisma = new PrismaClient();

server.listen(process.env.API_PORT || "5000", () => {
    console.log(
        `The API server has successfully started. \nListening at ${
          process.env.BASE_URL || "http://localhost:5000"
        }`
    )
})

process.on("SIGINT", () => {
    prisma.$disconnect();
    console.log("Prisma Disconnected");
    process.exit(0);
})