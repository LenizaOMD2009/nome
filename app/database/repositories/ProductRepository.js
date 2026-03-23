import { ilike, or, sql, asc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { products } from '../schema.js'; // Esta é a sua tabela

export default class ProductRepository {
    static async insert(data) {
        // Renomeie 'company' para 'conn' aqui:
        const conn = await Connection.connect(); 
        const db = drizzle(conn);
        
        try {
            const result = await db.insert(products) // Agora 'products' refere-se à tabela do schema
                .values({
                    name: data.name,
                    price: data.price
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
                const produto = await Connection.connect();
                const db = drizzle(produto);
                const whereClause =
                    rawSearch !== ''
                        ? or(
                            sql`${products.id}::text ILIKE ${terms}`,
                            ilike(products.name, terms),
                            sql`${products.price}::numeric ILIKE ${terms}`
                        )
                        : undefined;
    
                const result = await db
                    .select()
                    .from(products)
                    .where(whereClause)
                    .orderBy(asc(products.name, products.id, products.price))
                    .offset(data?.offset)
                    .limit(data?.limit);
    
                return {
                    data: result
                };
            } catch (error) {
                console.error('[ProductRepository] Erro na busca:', error.message);
                return {
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: [],
                };
            }
        }
}