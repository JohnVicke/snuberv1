import * as SQLite from "expo-sqlite";

export class DatabaseInitialization {
  public updateDatabaseTables(database: SQLite.Database) {
    database.transaction(this.createTables);
  }

  public createTables(transaction: SQLite.SQLTransaction) {
    const dropAllTables = false;
    if (dropAllTables) {
      transaction.executeSql("DROP TABLE IF EXISTS users;");
    }

    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, snus_at_home INT, snus_per_week INT);"
    );
  }
}
