const getToken = (): string | null => localStorage.getItem('token');

interface Options {
  method?: string;
  headers?: any;
  body?: any;
}

const get = async (url: string): Promise<any> => {
  const options: Options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
};

export { get };