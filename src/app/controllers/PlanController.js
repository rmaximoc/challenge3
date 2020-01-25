import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!req.header) {
      return res.status(400).json({ error: "You're not authorized to do it" });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planExists) {
      return res.status(400).json({ error: 'Plan already exists' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      title,
      duration,
      price,
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

export default new PlanController();
