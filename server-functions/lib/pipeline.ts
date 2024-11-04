import { PipelineProps, PipelineResult } from '../types';
import { logger } from './logger';

export const pipeline = async <T>({
  execFunc,
  authenFunc,
}: PipelineProps<T>): Promise<PipelineResult<T>> => {
  if (typeof authenFunc !== 'undefined') {
    try {
      logger.info(
        `start-processing-auth`,
        '---------------------------------------------------------'
      );
      const resultAuthen = await authenFunc();
      logger.info(
        `success-${authenFunc.toString()}`,
        resultAuthen.message,
        JSON.stringify(resultAuthen.data)
      );
      if (resultAuthen.status !== 200) {
        return resultAuthen;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error(`error-${authenFunc.toString()}`, err.message, JSON.stringify(err));
      return {
        status: 500,
        message: err.message,
        data: err,
      };
    } finally {
      logger.info(
        `finish-processing-auth`,
        '---------------------------------------------------------'
      );
    }
  }
  try {
    logger.info(
      `start-processing-func`,
      '---------------------------------------------------------'
    );
    const result = await execFunc();
    logger.info(`success-${execFunc.toString()}`, result.message, JSON.stringify(result.data));
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logger.error(`error-${execFunc.toString()}`, err.message, JSON.stringify(err));
    return {
      status: 500,
      message: err.message,
      data: err,
    };
  } finally {
    logger.info(
      `finish-processing-func`,
      '---------------------------------------------------------'
    );
  }
};
