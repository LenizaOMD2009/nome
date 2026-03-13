import { pgTable, varchar, numeric, serial } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    price: numeric("price", { precision: 18, scale: 4 }).notNull(),
});

export const company = pgTable("company", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    taxId: varchar("tax_id", { length: 20 }).notNull(), // Ex: CNPJ/Tax Number
});

export const supplier = pgTable("supplier", {
    id: serial("id").primaryKey(),
    contactName: varchar("contact_name", { length: 255 }).notNull(),
    category: varchar("category", { length: 100 }).notNull(),
});

export const customer = pgTable("customer", {
    id: serial("id").primaryKey(),
    full_name: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
});

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 50 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
});
