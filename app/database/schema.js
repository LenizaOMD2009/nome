import { pgTable, text, numeric, serial } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    price: numeric("price", { precision: 18, scale: 4 }).notNull(),
});
export const client = pgTable("client", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    cpf: numeric("cpf", { precision: 18, scale: 4 }).notNull()
});
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
});
export const supplier = pgTable("supplier", {
    id: serial("id").primaryKey(),
    contact_name: text("contact_name").notNull(),
    category: text("category").notNull(),
});
export const company = pgTable("company", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    cnpj: numeric("cnpj", { precision: 18, scale: 4 }).notNull(),
});