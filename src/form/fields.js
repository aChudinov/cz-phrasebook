const fields = {
  cz: {
    label: 'CZ',
    rules: 'required|string',
  },
  ru: {
    label: 'RU',
    rules: 'required|string',
  },
  archived: {
    label: 'Archived',
    rules: 'required|boolean',
    value: false
  },
  tags: {
    label: 'Tags',
    rules: 'required',
    options: tags,
  }
};

const tags = [
  { value: 'iphone', label: 'iPhone' },
  { value: 'watch', label: 'Watch' },
  { value: 'imac', label: 'iMac' },
  { value: 'macpro', label: 'Mac Pro' },
  { value: 'macbookair', label: 'MacBook Air' },
  { value: 'macbookpro', label: 'MacBook Pro' },
];

import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';


class PhrasebookForm extends MobxReactForm {

  onSuccess(form) {
    console.log('Form Values!', form.values());
  }

  onError(form) {
    console.log('All form errors', form.errors());
    form.invalidate('This is a generic error message!');
  }
}

const form = new PhrasebookForm({ fields }, { plugins: { dvr: validatorjs } });

export default form;
