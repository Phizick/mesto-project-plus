export const urlRegExp = new RegExp(
  '^(http(s)?://)?'
  + '(www\\.)?'
  + '[a-z0-9-._~:/?#[\\]@!$&\'()*+,;=]+'
  + '(#[a-z0-9._-]+)?$',
  'i',
);
