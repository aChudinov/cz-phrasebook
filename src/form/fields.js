import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

const fields = {
  cz: {
    placeholder: 'Czech',
    rules: 'required|string',
    bindings: 'input'
  },
  ru: {
    placeholder: 'Russian',
    rules: 'required|string',
    bindings: 'input'
  },
  isNoun: {
    label: 'Noun',
    rules: 'boolean',
    value: false,
    bindings: 'switch'
  },
  archived: {
    label: 'Archived',
    rules: 'boolean',
    value: false,
    bindings: 'switch'
  },
  tags: {
    placeholder: 'Tags',
    rules: 'array',
    value: []
  },
  comment: {
    placeholder: 'Comment',
    rules: 'string',
    bindings: 'input'
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
