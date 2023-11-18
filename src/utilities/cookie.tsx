import Cookie from 'js-cookie';

export const setCookie = (value: string) => {
  Cookie.set('auth_key', value, {
    expires: 15
  });
};

export const getAuthCookie = () => {
  return Cookie.get('auth_key') || false;
};

export const removeAuthCookie = () => {
  Cookie.remove('auth_key');
};
