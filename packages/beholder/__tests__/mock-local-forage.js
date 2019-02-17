class MockLocalStorage {
  constructor() {
    this.state = {};
  }

  clear() {
    this.state = {};
  }

  setState(value) {
    this.state = value;
  }

  getItem(key) {
    return new Promise(resolve => {
      resolve(this.state[key]);
    });
  }

  setItem(key, value) {
    return new Promise(resolve => {
      this.state[key] = value;
      resolve(this.state[key]);
    });
  }
}

module.exports = { MockLocalStorage };
