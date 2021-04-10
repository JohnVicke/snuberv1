import * as SQlite from "expo-sqlite";
import { DatabaseInitialization } from "./DatabaseInit";

export interface Database {
  createUser(snusAtHome: Number, snutPerWeek: Number): Promise<void>;
  getUser(id: Number): Promise<void>;
}

let databaseInstance: SQlite.Database | undefined;

const getDb = async (): Promise<SQlite.Database> => {
  if (databaseInstance) {
    return databaseInstance;
  }
  return open();
};

const open = (): SQlite.Database => {
  if (databaseInstance) {
    console.log("[db] Database is already open: returning existing instance");
    return databaseInstance;
  }

  const db = SQlite.openDatabase("SnusDB");
  console.log("[db] Database open!");
  const dbInit = new DatabaseInitialization();
  dbInit.updateDatabaseTables(db);
  databaseInstance = db;
  return db;
};

const createUser = async (snusAtHome: Number, snusPerWeek: Number): Promise<void> => {
  console.log("[db] Creating new user...");
  return getDb().then((db) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO users (snus_at_home, snus_per_week) values (?, ?);`,
        [snusAtHome, snusPerWeek],
        (_, res) => {
          console.log("Insert res", res);
        }
      );
    });
  });
};

const getUser = async (id: Number): Promise<void> => {
  console.log("[db] Creating new user...");
  return getDb().then((db) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM users WHERE id = ?;`, [id], (_, res) => {
        console.log("Select", res);
        return res;
      });
    });
  });
};

export const dbInterface = {
  createUser,
  getUser,
};
