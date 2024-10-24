import axios, { AxiosResponse, AxiosError } from "axios";

const baseUrl = "http://79.134.138.252:7111/";

export class RestAPI {
  static handleError(error: AxiosError): void {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }
  }

  static async getRequest(
    pathUrl: string,
    params: any = {}
  ): Promise<AxiosResponse<any>> {
    const url = `${baseUrl}${pathUrl}`;
    try {
      const response: AxiosResponse<any> = await axios.get(url, { params });
      return response;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  static async postRequest(
    pathUrl: string,
    body: any
  ): Promise<AxiosResponse<any>> {
    const url = `${baseUrl}${pathUrl}`;
    try {
      const response: AxiosResponse<any> = await axios.post(url, body);
      console.log(response.data);
      return response;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }
}
