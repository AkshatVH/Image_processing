import type { ApiError } from '../types';

export class ApiService {
  static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json() as ApiError;
      throw new Error(error.message || 'An error occurred');
    }
    return response.json() as Promise<T>;
  }

  static createFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('image', file);
    return formData;
  }
}