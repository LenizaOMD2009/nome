import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { customer } from '../schema.js';

export default class CustomerRepository {
    static async insert(data) {
        const client = await Connection.connect();
        const db = drizzle(client);
        try {
            const result = await db.insert(customer).values({
                full_name: data.full_name,
                email: data.email
            }).returning();
            return result[0];
        } finally {
            client.release();
        }
    }
}