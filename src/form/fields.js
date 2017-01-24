const fields = {
  cz: {
    label: 'CZ',
    rules: 'required|string',
    bindings: 'input'
  },
  ru: {
    label: 'RU',
    rules: 'required|string',
    bindings: 'input'
  },
  archived: {
    label: 'Archived',
    rules: 'required|boolean',
    value: false,
    bindings: 'switch'
  },
  tags: {
    label: 'Tags',
    rules: 'required|array',
    value: []
  }
};

import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

class PhrasebookForm extends MobxReactForm {

  bindings() {
    return {
      input: {
        value: 'value',
        onChange: 'onChangeText',
        onFocus: 'onFocus',
        onBlur: 'onBlur'
      },
      switch: {
        value: 'value',
        onChange: 'onValueChange',
        disabled: 'disabled'
      }
    };
  }

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
