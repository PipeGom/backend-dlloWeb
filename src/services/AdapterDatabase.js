
class IDatabase {
  findAll(collectionName) {
    throw "Implementar método";
  }
  findOne(collectionName, id) {
    throw "Implementar método";
  }
  create(collectionName, payload) {
    throw "Implementar método";
  }
  update(collectionName, payload, id) {
    throw "Implementar método";
  }
  delete(collectionName, id) {
    throw "Implementar método";
  }
  findByFilter(collectionName, filter) {
    throw "Implementar método";
  }
}

module.exports = { IDatabase };
