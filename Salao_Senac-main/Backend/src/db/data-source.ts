import "reflect-metadata"
import { DataSource } from "typeorm"
import { config } from "../config/db.config"

export const AppDataSource = new DataSource(config);