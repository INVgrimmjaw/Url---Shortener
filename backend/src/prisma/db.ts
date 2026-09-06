import dotenv from 'dotenv';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

dotenv.config({
  path: "./src/.env"
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);

export const db = postgres<Contract>({
  contractJson,
  url: process.env.DATABASE_URL!,
});