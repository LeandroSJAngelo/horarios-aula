import { Inject, Injectable } from "@nestjs/common";
import { Pool, QueryResult, QueryResultRow } from "pg";

@Injectable()
export class DatabaseService {
  constructor(@Inject('DB_POOL') private readonly db: Pool) {}

  async query<T extends QueryResultRow = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
    return this.db.query(sql, params);
  }

  async getClient() {
    return this.db.connect();
  }
}