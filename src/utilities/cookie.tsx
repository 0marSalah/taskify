import Cookie from 'js-cookie';

export const setCookie = (value: string) => {
  Cookie.set('auth_key', value, {
    expires: 15
  });
};

export const getCookie = () => {
  return Cookie.get('auth_key') || false;
};

export const removeCookie = () => {
  Cookie.remove('auth_key');
};
