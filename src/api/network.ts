import axios, { Method } from 'axios';
import { toast } from 'react-toastify';

interface RequestOptions {
  url: string;
  body?: any;
  headers?: any;
  method?: Method;
}

interface Response {
  success: boolean;
  response?: any;
  error?: any;
}

const request = async (options: RequestOptions): Promise<Response> => {
  let { url, body, headers, method } = options;

  try {
    const response = await axios({ url, method, data: body, headers });
    const { status, message, data } = response.data;

    if (status !== 'error') {
      return { success: true, response: data };
    } else {
      throw message;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return { success: false, error: error?.response?.data?.message };
  }
};

const network = {
  request: {
    post: (options: RequestOptions) => request({ ...options, method: 'POST' }),
    get: (options: RequestOptions) => request({ ...options, method: 'GET' }),
    delete: (options: RequestOptions) => request({ ...options, method: 'DELETE' }),
    put: (options: RequestOptions) => request({ ...options, method: 'PUT' }),
    patch: (options: RequestOptions) => request({ ...options, method: 'PATCH' }),
  },
};

export default network;
