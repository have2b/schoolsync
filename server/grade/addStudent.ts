import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

export interface AddStudentReq {
  studentIds: number[];
  rosterId: number;
}

export const addStudentGrades = async (req: AddStudentReq): Promise<PipelineResult<unknown>> => {
  try {
    const { studentIds, rosterId } = req;

    if (studentIds.length === 0) {
      return {
        status: 400,
        message: 'noStudents',
        data: null,
      };
    }

    studentIds.map(async (studentId) => {
      await prisma.grade.create({
        data: {
          studentId,
          rosterId,
          attendancePoint: 0, // default value
          midTermPoint: 0, // default value
          finalPoint: 0, // default value
          finalGrade: 0, // default value
          examPoint: 0, // default value
        },
      });
    });

    return {
      status: 204,
      message: 'added',
      data: {},
    };
  } catch (error) {
    logger.error('Error updating grades', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
