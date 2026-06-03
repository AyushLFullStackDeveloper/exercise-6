const apiConfig = require('../../config/apiConfig');
const { deleteEntity, resolveId } = require('../api/entityHelper');

class CleanupRegistry {
  constructor() {
    this.items = [];
  }

  add(type, entity) {
    const id = resolveId(entity);

    if (id) {
      this.items.push({ type, id });
    }

    return entity;
  }

  async cleanup(token) {
    const endpoints = {
      mapping: apiConfig.endpoints.mappings,
      user: apiConfig.endpoints.users,
      institute: apiConfig.endpoints.institutes,
      role: apiConfig.endpoints.roles,
    };

    while (this.items.length) {
      const item = this.items.pop();
      await deleteEntity(endpoints[item.type], item.id, token).catch(() => null);
    }
  }
}

module.exports = CleanupRegistry;
