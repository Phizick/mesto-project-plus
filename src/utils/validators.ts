export const nameValidationOptions = {
  validator: (str: string) => str.length > 2 && str.length <= 30,
  message: 'username must be between 2 and 30 characters',
};

export const aboutValidationOptions = {
  validator: (str: string) => str.length > 2 && str.length <= 200,
  message: 'about info must be between 2 and 200 characters',
};

export const avatarValidationOptions = {
  validator: (str: string) => /^http(s)?:\/\/\S+(\.jpg|\.jpeg|\.png)$/.test(str),
  message: 'avatar must be a valid URL to a JPG or PNG image',
};
