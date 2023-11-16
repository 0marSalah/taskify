const fetcher = async (url: string, method: string, body: any) => {
  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
  console.log(process.env.REACT_APP_HOST_URL + url);
};

export default fetcher;
