class Storage {
  get(item) {
    return JSON.parse(localStorage.getItem(item));
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
