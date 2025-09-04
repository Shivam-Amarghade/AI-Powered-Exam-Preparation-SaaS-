// Simple IndexedDB wrapper
export function openDB(dbName = "taskDB", storeName = "tasks") {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: "id" });
        store.createIndex("updated_at", "updated_at", { unique: false });
      }
      if (!db.objectStoreNames.contains("queue")) {
        db.createObjectStore("queue", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(e);
  });
}

export function addTask(task) {
  return openDB().then((db) => {
    const tx = db.transaction("tasks", "readwrite");
    tx.objectStore("tasks").put(task);
    return tx.complete;
  });
}

export function getAllTasks() {
  return openDB().then((db) => {
    return new Promise((resolve) => {
      const tx = db.transaction("tasks", "readonly");
      const store = tx.objectStore("tasks");
      const all = store.getAll();
      all.onsuccess = () => resolve(all.result);
    });
  });
}

export function addToQueue(op) {
  return openDB().then((db) => {
    const tx = db.transaction("queue", "readwrite");
    tx.objectStore("queue").add(op);
    return tx.complete;
  });
}

export function getQueue() {
  return openDB().then((db) => {
    return new Promise((resolve) => {
      const tx = db.transaction("queue", "readonly");
      const store = tx.objectStore("queue");
      const all = store.getAll();
      all.onsuccess = () => resolve(all.result);
    });
  });
}

export function clearQueue() {
  return openDB().then((db) => {
    const tx = db.transaction("queue", "readwrite");
    tx.objectStore("queue").clear();
    return tx.complete;
  });
}
