export type StepData = {
  [key: string]: unknown;
};

// Type for API response
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const mockApi = {
  async submitStepData<T extends StepData>(data: T): Promise<ApiResponse<T>> {
    // Simulate network delay of 500ms
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: data,
        });
      }, 500);
    });
  },
};
