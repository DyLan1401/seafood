import pool from "../utils/db.js";

let usersCache = {};

export const clearUsersCache = () => {
    usersCache = {};
};

export const userList = async ({ page = 1, limit = 5 }) => {
    const cacheKey = `users_p${page}_l${limit}`;
    if (usersCache[cacheKey]) {
        return usersCache[cacheKey];
    }

    const offset = (page - 1) * limit;
    const countSql = `SELECT COUNT(*) as total FROM users`;
    const [[{ total }]] = await pool.query(countSql);

    // Never expose password hashes from list APIs.
    const dataSql = `
        SELECT id, email, role, created_at
        FROM users
        ORDER BY id DESC
        LIMIT ? OFFSET ?
    `;

    const [rows] = await pool.query(dataSql, [limit, offset]);

    const result = {
        items: rows,
        pagination: {
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            limit
        }
    };

    usersCache[cacheKey] = result;
    return result;
};

export const userDetail = async ({ id }) => {
    const [rows] = await pool.query(
        `SELECT id, email, role, created_at FROM users WHERE id = ? LIMIT 1`,
        [id]
    );
    return rows[0];
};

export const deleteUser = async ({ id }) => {
    const [rows] = await pool.query(
        `DELETE FROM users WHERE id = ?`,
        [id]
    );
    clearUsersCache();
    return rows;
};

export const updateUser = async ({ id, email, password, role }) => {
    const fields = [];
    const values = [];

    if (email !== undefined) {
        fields.push("email = ?");
        values.push(email);
    }
    if (password !== undefined) {
        fields.push("password = ?");
        values.push(password);
    }
    if (role !== undefined) {
        fields.push("role = ?");
        values.push(role);
    }

    if (fields.length === 0) {
        return { affectedRows: 0 };
    }

    values.push(id);
    const [rows] = await pool.query(
        `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
        values
    );
    clearUsersCache();
    return rows;
};

export const findUserByEmail = async (email) => {
    const [rows] = await pool.query(
        `SELECT id, email, password, role FROM users WHERE email = ? LIMIT 1`,
        [email]
    );

    return rows[0];
};

export const register = async ({ email, password }) => {
    const [result] = await pool.query(
        `INSERT INTO users (email, password, role) VALUES (?, ?, 'user')`,
        [email, password]
    );
    clearUsersCache();
    return result;
};
