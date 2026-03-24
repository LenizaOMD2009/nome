import { ilike, or, sql, asc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { company } from '../schema.js'; // Esta é a sua tabela

export default class CompanyRepository {
    static async insert(data) {
        // Renomeie 'company' para 'conn' aqui:
        const conn = await Connection.connect(); 
        const db = drizzle(conn);
        
        try {
            const result = await db.insert(company) // Agora 'company' refere-se à tabela do schema
                .values({
                    name: data.name,
                    cnpj: data.cnpj
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
                const companies = await Connection.connect();
                const db = drizzle(companies);
                const whereClause =
                    rawSearch !== ''
                        ? or(
                            sql`${company.id}::text ILIKE ${terms}`,
                            ilike(company.name, terms),
                            sql`${company.cnpj}::text ILIKE ${terms}`
                        )
                        : undefined;
    
                const result = await db
                    .select()
                    .from(company)
                    .where(whereClause)
                    .orderBy(asc(company.name, company.id, company.cnpj))
                    .offset(data?.offset)
                    .limit(data?.limit);
    
                return {
                    data: result
                };
            } catch (error) {
                console.error('[CompanyRepository] Erro na busca:', error.message);
                return {
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: [],
                };
            }
        }
}