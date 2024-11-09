import { PipelineProps, PipelineResult } from '@/types';
import { logger } from './logger';

const logStart = (context: string) => {
  logger.info(`${context}-start`, '---------------------------------------------------------');
};

const logSuccess = (context: string, message: string, data: unknown) => {
  logger.info(`${context}-success`, message, JSON.stringify(data));
};

const logError = (context: string, error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  const errorData = error instanceof Error ? error : { error };
  logger.error(`${context}-error`, errorMessage, JSON.stringify(errorData));
};

const logFinish = (context: string) => {
  logger.info(`${context}-finish`, '---------------------------------------------------------');
};

export const pipeline = async <T>({
  execFunc,
  authenFunc,
}: PipelineProps<T>): Promise<PipelineResult<T>> => {
  if (authenFunc) {
    const authContext = 'auth-processing';
    try {
      logStart(authContext);
      const resultAuthen = await authenFunc();
      logSuccess(authContext, resultAuthen.message, resultAuthen.data);

      if (resultAuthen.status !== 200) {
        return resultAuthen;
      }
    } catch (err) {
      logError(authContext, err);
      return {
        status: 500,
        message: err instanceof Error ? err.message : 'An error occurred during authentication',
        data: err as T,
      };
    } finally {
      logFinish(authContext);
    }
  }

  const execContext = 'func-processing';
  try {
    logStart(execContext);
    const result = await execFunc();
    logSuccess(execContext, result.message, result.data);
    return result;
  } catch (err) {
    logError(execContext, err);
    return {
      status: 500,
      message: err instanceof Error ? err.message : 'An error occurred during execution',
      data: err as T,
    };
  } finally {
    logFinish(execContext);
  }
};
