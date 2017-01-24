import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

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
}

export default new PhrasebookForm({ fields }, { plugins: { dvr: validatorjs } });
