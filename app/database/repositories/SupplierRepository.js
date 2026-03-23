import { ilike, or, sql, asc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { supplier } from '../schema.js'; // Esta é a sua tabela

export default class SupplierRepository {
    static async insert(data) {
        // Renomeie 'company' para 'conn' aqui:
        const conn = await Connection.connect(); 
        const db = drizzle(conn);
        
        try {
            const result = await db.insert(supplier) // Agora 'supplier' refere-se à tabela do schema
                .values({
                    contact_name: data.contact_name,
                    category: data.category
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
                const forneced = await Connection.connect();
                const db = drizzle(forneced);
                const whereClause =
                    rawSearch !== ''
                        ? or(
                            sql`${supplier.id}::text ILIKE ${terms}`,
                            ilike(supplier.contact_name, terms),
                            sql`${supplier.category}::text ILIKE ${terms}`
                        )
                        : undefined;
    
                const result = await db
                    .select()
                    .from(supplier)
                    .where(whereClause)
                    .orderBy(asc(supplier.contact_name, supplier.id, supplier.category)) // Ordena por nome do contato, depois por id e categoria
                    .offset(data?.offset)
                    .limit(data?.limit);
    
                return {
                    data: result
                };
            } catch (error) {
                console.error('SupplierRepository] Erro na busca:', error.message);
                return {
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: [],
                };
            }
        }
}