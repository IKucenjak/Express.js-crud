const UserRepository = require('../repositories/UserRepository');

class UserService {

  async create(user_data) {
    const createdUser = await UserRepository.create(user_data);
    return createdUser;
  }

  async show(user_id) {
    const user = await UserRepository.show(user_id);
    return user;
  }

  async paginated(options) {
    const paginatedUsers = await UserRepository.paginated(options);
    return paginatedUsers;
  }

  async update(user_id, user_data) {
    const updatedUser = await UserRepository.update(user_id, user_data);
    return updatedUser;
  }

  async delete(user_id) {
    await UserRepository.destroy(user_id);
  }
}

module.exports = new UserService();