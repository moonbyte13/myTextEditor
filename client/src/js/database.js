import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// refactor with try catch
export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const data = await store.put({ content });
    await tx.done;
    console.log('🚀 - data saved to the database', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('Trying to open the database...');
    const db = await openDB('jate', 1);
    console.log('Database is opened successfully:', db);

    console.log('Trying to retrieve data from object store "jate"...');
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const data = await store.getAll();
    await tx.done;
    console.log('Data retrieved successfully:', data);
    return data;
  } catch (err) {
    console.error(
      'An error occurred while retrieving data from database:',
      err
    );
    return null;
  }
};

initdb();
