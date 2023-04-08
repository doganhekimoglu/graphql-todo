import { join } from "path";
export const ROOT_PATH = join(__dirname, "..");

export const GRAPHQL_SCHEMA_PATH = join(ROOT_PATH, "schema.graphql");

export const PRISMA_NOT_FOUND = "P2025";

export const PRISMA_UNIQUE_CONSTRAINT = "P2002";
