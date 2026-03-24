import { ilike, or, sql, asc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { client } from '../schema.js'; // Esta é a sua tabela

export default class ClientRepository {
    static async insert(data) {
        // Renomeie 'client' para 'conn' aqui:
        const conn = await Connection.connect(); 
        const db = drizzle(conn);
        
        try {
            const result = await db.insert(client) // Agora 'client' refere-se à tabela do schema
                .values({
                    name: data.name,
                    cpf: data.cpf
                })
                .returning();
            
            return result[0];
        } catch (error) {
            console.error('Erro no banco:', error);
            throw error; // Repassa o erro para o Main e depois para o Renderer
        } finally {
            conn.release(); // Libera a conexão 'conn'
        }
    }
    
    // Faça o mesmo no método search: substitua 'const client = await...' por 'const conn = await...'
    static async search(data) {
            //Captura o termo de pesquisa sem o %%
            const rawSearch = String(data?.term ?? '').trim();
            //Captura o termo da pesquisa já aplicando o %%
            const terms = `%${data?.term}%`;
            try {
                //Abre a conexão com banco de dados
                const clients = await Connection.connect();
                const db = drizzle(clients);
                const whereClause =
                    rawSearch !== ''
                        ? or(
                            sql`${client.id}::text ILIKE ${terms}`,
                            ilike(client.name, terms),
                            sql`${client.cpf}::text ILIKE ${terms}`
                        )
                        : undefined;
    
                const result = await db
                    .select()
                    .from(client)
                    .where(whereClause)
                    .orderBy(asc(client.name, client.id, client.cpf))
                    .offset(data?.offset)
                    .limit(data?.limit);
    
                return {
                    data: result
                };
            } catch (error) {
                console.error('[ClientRepository] Erro na busca:', error.message);
                return {
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: [],
                };
            }
        }
}