import {
  pgTable,
  serial,
  timestamp,
  text,
  boolean,
} from "drizzle-orm/pg-core";

const dateProps = { mode: "date" as const, precision: 3 as const };
const defaults = () => ({
  id: serial("id").primaryKey().unique(),
  updated_at: timestamp("updated_at", dateProps),
  created_at: timestamp("created_at", dateProps).defaultNow().notNull(),
});

export const user = pgTable("user", {
  ...defaults(),
  name: text("name").notNull().unique(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
});

export const session = pgTable("session", {
  ...defaults(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  ...defaults(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
});

export const verification = pgTable("verification", {
  ...defaults(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});
