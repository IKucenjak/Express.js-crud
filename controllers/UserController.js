const UserService = require('../services/UserService');

class UserController {

  async create(req, res) {
    try {
      const { email, first_name, last_name, password } = req.body;
      const user_data = { email, first_name, last_name, password };

      const createdUser = await UserService.create(user_data);

      res.status(201).json({ message: 'User created successfully', user: createdUser });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async show(req, res) {
    try {
      const user_id = req.params.user_id;
      const user = await UserService.show(user_id);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {

      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async paginated(req, res) {
    try {
      const { page, limit, search, sortField, sortOrder, filters } = req.query;

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        search: search || '',
        sortField: sortField || 'created_at',
        sortOrder: sortOrder || 'DESC',
        filters: filters ? JSON.parse(filters) : {},
      };

      const paginatedUsers = await UserService.paginated(options);

      res.status(200).json(paginatedUsers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const user_id = req.params.user_id;
      const { email, first_name, last_name } = req.body;
      const user_data = { email, first_name, last_name };

      const updatedUser = await UserService.update(user_id, user_data);

      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      const user_id = req.params.user_id;

      await UserService.delete(user_id);

      res.status(200).json({message: 'User successfully deactivated'});
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new UserController();
