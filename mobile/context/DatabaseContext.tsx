import React, { createContext, FC, useContext } from "react";
import { Database, dbInterface } from "../database/Database";

const DatabaseContext = createContext<Database | undefined>(undefined);

export const DatabaseProvider: FC = (props) => {
  return <DatabaseContext.Provider value={dbInterface} {...props} />;
};

export const useDatabase = (): Database => {
  const db = useContext(DatabaseContext);
  if (db === undefined) throw new Error("useDatabase must be used within a DatabaseProvider");
  return db;
};
