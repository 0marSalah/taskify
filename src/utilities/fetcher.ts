import { getAuthCookie } from './cookie';

const fetcher = async (url: string, method: string, body: any) => {
  const options: any =
    Object.keys(body).length > 0
      ? {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + getAuthCookie()
          },
          body: body && JSON.stringify(body)
        }
      : {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + getAuthCookie()
          }
        };
  try {
    const res = await fetch(process.env.REACT_APP_HOST_URL + url, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
  console.log(process.env.REACT_APP_HOST_URL + url);
};

export default fetcher;
