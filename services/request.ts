import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class BaseApi {
  baseURL: string;
  instance: AxiosInstance;

  constructor() {
    this.baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_KEY}/`;
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  callApi<T>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const { method, ...rest } = options;
    const reqMethod = method || 'GET';

    return this.instance({ method: reqMethod, ...rest });
  }
}

export default BaseApi;


