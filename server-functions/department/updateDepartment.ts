import prisma from '@/prisma';
import { PipelineResult } from '../interfaces';
import { logger } from '../lib';

interface UpdateDepartmentReq {
  name: string;
  detail?: string;
}

interface UpdateDepartmentRes {
  id: number;
}

export const updateDepartment = async (
  id: string,
  req: UpdateDepartmentReq
): Promise<PipelineResult<UpdateDepartmentRes | unknown>> => {
  try {
    const { name, detail } = req;

    const existingDepartment = await prisma.department.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!existingDepartment) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    const isExisted = await prisma.department.findFirst({
      where: {
        name,
      },
    });

    if (isExisted) {
      return {
        status: 400,
        message: 'duplicatedName',
        data: null,
      };
    }

    const updatedDepartment = await prisma.department.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        detail: detail ?? existingDepartment.detail,
      },
    });

    return {
      status: 204,
      message: 'updated',
      data: updatedDepartment.id,
    };
  } catch (error) {
    logger.error('Error updating department', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
