import * as Yup from 'yup';
import Courier from '../models/Courier';

class CourierController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar_id: Yup.string().required(),
    });

    if (!req.header) {
      return res.status(400).json({ error: "You're not authorized to do it" });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const courierExists = await Courier.findOne({
      where: { email: req.body.email },
    });

    if (courierExists) {
      return res.status(400).json({ error: 'Courier already exists' });
    }

    const { name, email } = await Courier.create(req.body);

    return res.json({
      name,
      email,
    });
  }

  async list(req, res) {
    return res.json({
      list: 'lista de usuarios',
    });
  }

  async update(req, res) {
    return res.json({
      update: 'atualiza usuarios',
    });
  }

  async delete(req, res) {
    return res.json({
      delete: 'deleta usuarios',
    });
  }
}

export default new CourierController();
