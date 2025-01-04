import { StepData } from "@/types/step-data";

export interface ArrayStepData extends StepData {
  values: unknown[];
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const mockApi = {
  async submitStepData(data: StepData | ArrayStepData): Promise<ApiResponse<StepData>> {
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
