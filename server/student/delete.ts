import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface DeleteRes {
  id: number;
}

export const deleteStudent = async (id: string): Promise<PipelineResult<DeleteRes | unknown>> => {
  try {
    const existingStudent = await prisma.student.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!existingStudent) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    const deletedStudent = await prisma.account.update({
      where: {
        id: existingStudent.accountId,
      },
      data: {
        isActive: false,
      },
    });

    return {
      status: 204,
      message: 'deleted',
      data: deletedStudent.id,
    };
  } catch (error) {
    logger.error('Error deleting student', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
