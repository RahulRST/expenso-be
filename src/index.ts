import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv"
import server from "./server";
dotenv.config();

const prisma = new PrismaClient();

server.listen(process.env.PORT || "5500", () => {
    console.log(
        `The API server has successfully started. \nListening at ${
          process.env.BASE_URL || "http://localhost:5500"
        }`
    )
})

process.on("SIGINT", () => {
    prisma.$disconnect();
    console.log("Prisma Disconnected");
    process.exit(0);
})