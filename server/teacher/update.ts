import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Degree } from '@prisma/client';
import { logger } from '../utils';

interface UpdateTeacherReq {
  name?: string;
  degree?: string;
  major?: string;
  departmentId?: number;
}

interface UpdateTeacherRes {
  id: number;
}

export const updateTeacher = async (
  id: string,
  req: UpdateTeacherReq
): Promise<PipelineResult<UpdateTeacherRes | unknown>> => {
  try {
    const { name, degree, major, departmentId } = req;

    const existingTeacher = await prisma.teacher.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!existingTeacher) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    const updatedTeacher = await prisma.teacher.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name ?? existingTeacher.name,
        degree: (degree as Degree) ?? existingTeacher.degree,
        major: major ?? existingTeacher.major,
        departmentId: departmentId ?? existingTeacher.departmentId,
      },
    });

    return {
      status: 204,
      message: 'updated',
      data: updatedTeacher.id,
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
