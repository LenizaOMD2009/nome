import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { users } from '../schema.js';

export default class UsersRepository {
    static async insert(data) {
        const client = await Connection.connect();
        const db = drizzle(client);
        try {
            const result = await db.insert(users).values({
                username: data.username,
                password: data.password
            }).returning();
            return result[0];
        } finally {
            client.release();
        }
    }
}