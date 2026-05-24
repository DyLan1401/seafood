import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import pool from "./utils/db.js";

const run = async () => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
        `INSERT INTO users (email, password, role)
         VALUES (?, ?, 'admin')
         ON DUPLICATE KEY UPDATE password = VALUES(password), role = 'admin'`,
        [email, passwordHash]
    );

    process.exit(0);
};

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
