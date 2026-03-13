import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { company } from '../schema.js';

export default class CompanyRepository {
    static async insert(data) {
        const client = await Connection.connect();
        const db = drizzle(client);
        try {
            const result = await db.insert(company).values({
                name: data.name,
                taxId: data.taxId
            }).returning();
            return result[0];
        } finally {
            client.release();
        }
    }
}