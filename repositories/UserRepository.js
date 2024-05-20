const User = require('../models/User');

class UserRepository{
  async create(user_data){
    return User.store(user_data);
  };

  async show(user_id){
    return await User.show(user_id);
  };

  async paginated(options){
    try {
      return await User.paginated(options);
    } catch (error) {
      throw error;
    }
  };

  async update(user_id, user_data){
    return await User.update(user_id, user_data);
  };

  async destroy(user_id){
    return await User.delete(user_id);
  };

}


module.exports = new UserRepository();