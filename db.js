const { PrismaClient } = require("@prisma/client");

let db;

if (process.env.NODE_ENV === "production") {
    db = new PrismaClient();
    db.$connect();
    console.log("Connected to Prisma");
} else {
    if (!global.__db) {
        global.__db = new PrismaClient();
        global.__db.$connect();
    }
    db = global.__db;
}

module.exports = { db };
