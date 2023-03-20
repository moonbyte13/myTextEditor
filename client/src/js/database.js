import { openDB } from 'idb';

// Define the name and version of the database
const DB_NAME = 'mote';
const DB_VERSION = 1;

// Initialize the database by creating an object store with a unique key (id)
const initDb = async () => {
  try {
    // Open the database and check if it already exists
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (db.objectStoreNames.contains(DB_NAME)) {
          console.log(`${DB_NAME} database already exists`);
          return;
        }
        // Create an object store with a keyPath of "id" and auto-incrementing values
        db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
        console.log(`${DB_NAME} database created`);
      },
    });
    return db;
  } catch (error) {
    console.error('Error initializing the database:', error);
    return null;
  }
};

// Add data to the database
export const putDb = async (content) => {
  try {
    // Open the database for writing
    const db = await openDB(DB_NAME, DB_VERSION);
    const tx = db.transaction(DB_NAME, 'readwrite');
    const store = tx.objectStore(DB_NAME);
    const value = content || '';
    // Put the data into the object store
    await store.put({ value });
    await tx.done;
    console.log(`🚀 - data saved to ${DB_NAME}: ${value}`);
    return value;
  } catch (error) {
    console.error(`Failed to put data into ${DB_NAME}:`, error);
    throw error;
  }
};

// Retrieve data from the database
export const getDb = async () => {
  try {
    console.log(`Trying to open the ${DB_NAME} database...`);
    // Open the database for reading
    const db = await openDB(DB_NAME, DB_VERSION);
    console.log(`${DB_NAME} database is opened successfully`);
    console.log(`Trying to retrieve data from ${DB_NAME}...`);
    const tx = db.transaction(DB_NAME, 'readonly');
    const store = tx.objectStore(DB_NAME);
    // Get all the values from the object store
    const request = store.getAll();
    await tx.done;
    // Return the first value from the result set, or null if no values are found
    const result = await request;
    console.log('Data retrieved successfully:', result);
    return result.length > 0 ? result[0].value : null;
  } catch (error) {
    console.error(`An error occurred while retrieving data from ${DB_NAME} database:`, error);
    return null;
  }
};

// Initialize the database when the module first loads
initDb();