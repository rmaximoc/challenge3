import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!req.header) {
      return res.status(400).json({ error: "You're not authorized to do it" });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const userExists = await Recipient.findOne({
      where: { recipient_name: req.body.recipient_name },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const {
      id,
      recipient_name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      recipient_name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.number(),
      state: Yup.number().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_name } = req.body;

    const user = await Recipient.findByPk(req.userId);

    if (recipient_name !== user.recipient_name) {
      const userExists = await Recipient.findOne({ where: { recipient_name } });

      if (userExists) {
        return res.status(400).json({ error: 'Recipient already exists' });
      }
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, recipient_name });
  }
}

export default new RecipientsController();
