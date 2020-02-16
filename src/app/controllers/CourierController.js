import * as Yup from 'yup';
import Courier from '../models/Courier';

class CourierController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
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
    const courierExists = await Courier.findOne({
      where: { email: req.body.email },
    });

    if (!courierExists)
      return res.status(400).json({ error: 'Courier does not exists' });

    return res.json({
      courier: courierExists,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
    });

    if (!req.header) {
      return res.status(400).json({ error: "You're not authorized to do it" });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id, name, email } = req.body;

    const courier = await Courier.findByPk(id);

    if (email !== courier.email) {
      const userExists = await Courier.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'Courier exists' });
      }
    }

    await Courier.update({ email, name }, { where: { id } });

    return res.json(courier);
  }

  async delete(req, res) {
    const courierExists = await Courier.findOne({
      where: { email: req.body.email },
    });

    if (!courierExists)
      return res.status(400).json({ error: 'Courier does not exists' });

    Courier.destroy({
      where: { email: req.body.email },
    });

    return res.json({
      message: 'Courier has been deleted',
    });
  }
}

export default new CourierController();
