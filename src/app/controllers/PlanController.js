import * as Yup from 'yup';

class PlainController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.string().required(),
      price: Yup.number().required(),
    });
  }
}

export default new PlainController();
