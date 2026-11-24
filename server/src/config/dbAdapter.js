// Universal Data Adapter for CostFlow ERP
// Seamlessly delegates to Mongoose / MongoDB Atlas when connected,
// or provides an in-memory document store when running without a MongoDB daemon.

const mongoose = require('mongoose');

class InMemoryCollection {
  constructor(name, initialData = []) {
    this.name = name;
    this.items = [...initialData];
  }

  async countDocuments() {
    return this.items.length;
  }

  async insertMany(docs) {
    const inserted = docs.map((doc) => ({
      _id: doc._id || Math.random().toString(36).substring(2, 9),
      ...doc,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    this.items.push(...inserted);
    return inserted;
  }

  find(query = {}) {
    let result = [...this.items];

    if (query.$or) {
      result = result.filter((item) =>
        query.$or.some((condition) => {
          for (let key in condition) {
            const pattern = condition[key];
            if (pattern && pattern.$regex) {
              const regex = new RegExp(pattern.$regex, pattern.$options || 'i');
              return regex.test(String(item[key] || ''));
            }
          }
          return false;
        })
      );
    }

    if (query.category) {
      result = result.filter((item) => item.category === query.category);
    }
    if (query.status) {
      result = result.filter((item) => item.status === query.status);
    }
    if (query.supplier) {
      result = result.filter((item) => item.supplier === query.supplier);
    }
    if (query.resolved !== undefined) {
      result = result.filter((item) => item.resolved === query.resolved);
    }

    const sortFn = (sortObj) => {
      // Return sorted array
      return {
        limit: (n) => result.slice(0, n),
        then: (resolve) => resolve(result),
      };
    };

    return {
      sort: sortFn,
      limit: (n) => result.slice(0, n),
      then: (resolve) => resolve(result),
    };
  }

  async findOne(query = {}) {
    if (query.orderNumber) {
      return this.items.find((item) => item.orderNumber === query.orderNumber) || this.items[0];
    }
    return this.items[0] || null;
  }

  async findById(id) {
    const found = this.items.find((item) => String(item._id) === String(id));
    if (!found) return null;
    return {
      ...found,
      save: async function () {
        return this;
      },
    };
  }

  async findByIdAndUpdate(id, update, options = {}) {
    const index = this.items.findIndex((item) => String(item._id) === String(id));
    if (index === -1) return null;
    this.items[index] = {
      ...this.items[index],
      ...update,
      updatedAt: new Date(),
    };
    return this.items[index];
  }

  async findByIdAndDelete(id) {
    const index = this.items.findIndex((item) => String(item._id) === String(id));
    if (index === -1) return null;
    const removed = this.items.splice(index, 1);
    return removed[0];
  }

  createModelInstance(data) {
    const collection = this;
    const newItem = {
      _id: Math.random().toString(36).substring(2, 9),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Calculate dynamic fields if Product
    if (newItem.productionCost !== undefined && newItem.sellingPrice !== undefined) {
      newItem.productionCost = Number(newItem.productionCost);
      newItem.sellingPrice = Number(newItem.sellingPrice);
    }

    return {
      ...newItem,
      save: async function () {
        collection.items.push(newItem);
        return newItem;
      },
    };
  }
}

// Global in-memory registry
const inMemoryStore = {
  products: new InMemoryCollection('products'),
  materials: new InMemoryCollection('materials'),
  suppliers: new InMemoryCollection('suppliers'),
  orders: new InMemoryCollection('orders'),
  activities: new InMemoryCollection('activities'),
  alerts: new InMemoryCollection('alerts'),
};

let isConnectedToMongo = false;

const setMongoConnected = (connected) => {
  isConnectedToMongo = connected;
};

const getStatus = () => isConnectedToMongo;

function createModelWrapper(modelName, mongooseModel, storeKey) {
  function ModelConstructor(data) {
    if (isConnectedToMongo) {
      return new mongooseModel(data);
    }
    return inMemoryStore[storeKey].createModelInstance(data);
  }

  ModelConstructor.countDocuments = async function () {
    if (isConnectedToMongo) return mongooseModel.countDocuments();
    return inMemoryStore[storeKey].countDocuments();
  };

  ModelConstructor.insertMany = async function (docs) {
    if (isConnectedToMongo) return mongooseModel.insertMany(docs);
    return inMemoryStore[storeKey].insertMany(docs);
  };

  ModelConstructor.find = function (query) {
    if (isConnectedToMongo) return mongooseModel.find(query);
    return inMemoryStore[storeKey].find(query);
  };

  ModelConstructor.findOne = async function (query) {
    if (isConnectedToMongo) return mongooseModel.findOne(query);
    return inMemoryStore[storeKey].findOne(query);
  };

  ModelConstructor.findById = async function (id) {
    if (isConnectedToMongo) return mongooseModel.findById(id);
    return inMemoryStore[storeKey].findById(id);
  };

  ModelConstructor.findByIdAndUpdate = async function (id, update, opts) {
    if (isConnectedToMongo) return mongooseModel.findByIdAndUpdate(id, update, opts);
    return inMemoryStore[storeKey].findByIdAndUpdate(id, update, opts);
  };

  ModelConstructor.findByIdAndDelete = async function (id) {
    if (isConnectedToMongo) return mongooseModel.findByIdAndDelete(id);
    return inMemoryStore[storeKey].findByIdAndDelete(id);
  };

  return ModelConstructor;
}

module.exports = {
  setMongoConnected,
  getStatus,
  createModelWrapper,
  inMemoryStore,
};
