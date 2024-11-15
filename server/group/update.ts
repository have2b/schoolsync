import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface UpdateGroupReq {
  name?: string;
  capacity?: number;
  teacherId?: number;
  departmentId?: number;
}

interface UpdateGroupRes {
  id: number;
}

export const updateGroup = async (
  id: string,
  req: UpdateGroupReq
): Promise<PipelineResult<UpdateGroupRes | unknown>> => {
  try {
    const { name, capacity, teacherId, departmentId } = req;

    const existingGroup = await prisma.group.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!existingGroup) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    const existedName = await prisma.group.findFirst({
      where: {
        name,
      },
    });

    if (existedName && existingGroup.name !== name && name) {
      return {
        status: 400,
        message: 'duplicatedName',
        data: null,
      };
    }

    const updatedGroup = await prisma.group.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name ?? existingGroup.name,
        capacity: capacity ?? existingGroup.capacity,
        teacherId: teacherId ?? existingGroup.teacherId,
        departmentId: departmentId ?? existingGroup.departmentId,
      },
    });

    return {
      status: 204,
      message: 'updated',
      data: updatedGroup.id,
    };
  } catch (error) {
    logger.error('Error updating teacher', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
