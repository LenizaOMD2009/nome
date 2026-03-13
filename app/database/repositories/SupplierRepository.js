import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { supplier } from '../schema.js';

export default class SupplierRepository {
    static async insert(data) {
        const client = await Connection.connect();
        const db = drizzle(client);
        try {
            const result = await db.insert(supplier).values({
                contactName: data.contactName,
                category: data.category
            }).returning();
            return result[0];
        } finally {
            client.release();
        }
    }
}