class Storage {
  get(item, defaultValue) {
    const value = localStorage.getItem(item);
    if (value === null) return defaultValue
    return JSON.parse(value);
  }

  save(item, value) {
    return localStorage.setItem(item, JSON.stringify(value));
  }

  delete(item) {
    return localStorage.removeItem(item);
  }
}

const storage = new Storage();

export default storage;
