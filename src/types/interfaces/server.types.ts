import { JWTPayload } from 'jose';

export interface PipelineResult<T> {
  message: string;
  status: number;
  data: T;
}

export interface PipelineProps<T> {
  execFunc: () => Promise<PipelineResult<T>>;
  authenFunc?: () => Promise<PipelineResult<T>>;
}
export interface UpdateStudentReq {
  name: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  departmentId: number;
  classId: number;
}

export interface SessionPayload extends JWTPayload {
  accountId: number;
  expiresAt: Date;
  role: string;
}

export interface CreateStudentReq {
  name: string;
  avatar?: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  departmentId: number;
  classId: number;
}
