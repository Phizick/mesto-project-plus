interface ValidationOptions {
  // eslint-disable-next-line no-unused-vars
  validator: (arg: string) => boolean;
  message: string;
}

export const nameValidationOptions: ValidationOptions = {
  validator: (str: string) => str.length > 2 && str.length <= 30,
  message: 'username must be between 2 and 30 characters',
};

export const aboutValidationOptions: ValidationOptions = {
  validator: (str: string) => str.length > 2 && str.length <= 200,
  message: 'about info must be between 2 and 200 characters',
};

export const linkValidationOptions: ValidationOptions = {
  validator: (str: string) => /^http(s)?:\/\/\S+(\.jpg|\.jpeg|\.png)$/.test(str),
  message: 'avatar must be a valid URL',
};
