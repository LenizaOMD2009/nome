import { ilike, or, sql, asc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { users } from '../schema.js'; // Esta é a sua tabela

export default class UsersRepository {
    static async insert(data) {
        // Renomeie 'company' para 'conn' aqui:
        const conn = await Connection.connect(); 
        const db = drizzle(conn);
        
        try {
            const result = await db.insert(users) // Agora 'users' refere-se à tabela do schema
                .values({
                    name: data.name,
                    email: data.email
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
                const usuario = await Connection.connect();
                const db = drizzle(usuario);
                const whereClause =
                    rawSearch !== ''
                        ? or(
                            sql`${users.id}::text ILIKE ${terms}`,
                            ilike(users.name, terms),
                            sql`${users.email}::text ILIKE ${terms}`
                        )
                        : undefined;
    
                const result = await db
                    .select()
                    .from(users)
                    .where(whereClause)
                    .orderBy(asc(users.name, users.id, users.email)) // Ordena por nome do contato, depois por id e categoria
                    .offset(data?.offset)
                    .limit(data?.limit);
    
                return {
                    data: result
                };
            } catch (error) {
                console.error('UsersRepository] Erro na busca:', error.message);
                return {
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: [],
                };
            }
        }
}