import { PipelineProps, PipelineResult } from '@/types';
import { logger } from './logger';

const logStart = (context: string) => {
  logger.info(`[${context}] - START`, '---------------------------------------------------------');
};

const logSuccess = (context: string, message: string, data: unknown) => {
  logger.info(`[${context}] - SUCCESS`, `${message} | Data: ${JSON.stringify(data)}`);
};

const logError = (context: string, error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  const errorStack = error instanceof Error ? error.stack : 'No stack trace available';
  logger.error(
    `[${context}] - ERROR`,
    `${errorMessage} | Data: ${JSON.stringify(error)} | Stack: ${errorStack}`
  );
};

const logFinish = (context: string) => {
  logger.info(`[${context}] - FINISH`, '---------------------------------------------------------');
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
