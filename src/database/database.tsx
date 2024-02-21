import {
  // RxCollection,
  RxDatabase,
  addRxPlugin,
  createRxDatabase,
} from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { collections } from "./collections";
// import {
//   ChecklistDocType,
//   ItemDocType,
//   TaskDocType,
//   UserDocType,
// } from "@type/schema";

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBDevModePlugin);

let dbPromise: RxDatabase | null = null;

const createDatabase = async (): Promise<RxDatabase> => {
  // we should to create new database if doesn't exist
  try {
    const db = await createRxDatabase({
      name: process.env.REACT_APP_DATABASE || "default-database",
      storage: getRxStorageDexie(),
      // other configurations
      ignoreDuplicate: true,
    });

    // Add collections to the database
    await db.addCollections(collections);

    return db;
  } catch (error) {
    console.error("Error creating database:", error);
    throw error; // Rethrow the error to handle it at a higher level if needed
  }
};

// Function to get the database instance
const getDatabase = async (): Promise<RxDatabase> => {
  if (!dbPromise) {
    // If the database instance doesn't exist, create it
    dbPromise = await createDatabase();
    return dbPromise;
  } else {
    return dbPromise;
  }
};
export default getDatabase;
