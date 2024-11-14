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

export interface LoginReq {
  username: string;
  password: string;
}

export interface CreateDepartmentReq {
  name: string;
  detail?: string;
}

export interface CreateTeacherReq {
  name: string;
  degree: string;
  major: string;
  departmentId: string;
}

export interface CreateRes {
  id: number;
}

export interface DeleteRes {
  id: number;
}

export interface UpdateDepartmentReq {
  name: string;
  detail?: string;
}

export interface UpdateTeacherReq {
  name?: string;
  degree?: string;
  major?: string;
  departmentId?: number;
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

export interface UpdateRes {
  id: number;
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

export interface CreateStudentRes {
  id: number;
}
