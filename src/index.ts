import app from "./app";
import config from "./config";
import prisma from "./prisma/prisma";

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});

app.listen(config.port, async () => {
    console.log("Server started");
    await prisma.$connect();
});
