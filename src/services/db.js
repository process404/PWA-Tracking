const dbName = 'TrackingDB'
const storeName = 'coords'
let db;

export async function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);
  
      request.onupgradeneeded = (event) => {
        db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
      };
  
      request.onsuccess = (event) => {
        db = event.target.result;
        resolve(db);
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

export async function addLocation(position, isMoving) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add({ ...position, isMoving, timestamp: position.timestamp || new Date() });
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
}

export async function getAllLocations() {
    if (!db) {
        return Promise.reject(new Error('Database is not initialized. Please call openDB first.'));
    }
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

export async function clearLocations(){
  return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
}

export async function getCount(){
  return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.count();
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
}