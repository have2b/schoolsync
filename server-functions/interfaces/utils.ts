export interface PipelineResult<T> {
  message: string;
  status: number;
  data: T;
}

export interface PipelineProps<T> {
  execFunc: () => Promise<PipelineResult<T>>;
  authenFunc?: () => Promise<PipelineResult<T>>;
}
