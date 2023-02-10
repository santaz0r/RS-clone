type Tdata = {
  [key: string]: string;
};
type TMessage = {
  [key: string]: string;
};

type TConfig = {
  [key: string]: { [key: string]: { message: string; min?: string } };
};

function validator(data: Tdata, config: TConfig) {
  const errors: { [key: string]: string } = {};
  function validate(method: string, dataInput: string, configOptions: TMessage) {
    let statusValidate: boolean | undefined;
    switch (method) {
      case 'isRequired': {
        statusValidate = dataInput.trim() === '';
        break;
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(dataInput);
        break;
      }
      case 'min': {
        statusValidate = dataInput.length < Number(configOptions.value);
        break;
      }
      case 'noSpaces': {
        const spacesRegExp = /^\S+$/;
        statusValidate = !spacesRegExp.test(dataInput);
        break;
      }
      case 'isUrl': {
        const urlRegExp = /[a-z]+:\/\/.+/g;
        statusValidate = !urlRegExp.test(dataInput);
        break;
      }
      default:
        break;
    }
    if (statusValidate) return configOptions.message;
    return null;
  }
  Object.keys(data).forEach((key) => {
    Object.keys(config[key]).forEach((method) => {
      const error = validate(method, data[key], config[key][method]);
      if (error && !errors[key]) {
        errors[key] = error;
      }
    });
  });
  return errors;
}

export default validator;
