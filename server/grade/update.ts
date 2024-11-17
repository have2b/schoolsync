import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

export interface UpdateGradeReq {
  studentId: number;
  rosterId: number;
  attendancePoint?: number;
  midTermPoint?: number;
  finalPoint?: number;
  finalGrade?: number;
  examPoint?: number;
}

interface UpdateRes {
  attendancePoint: number;
  midTermPoint: number;
  finalPoint: number;
  finalGrade: number;
  examPoint: number;
}

export const updateGrades = async (
  updates: UpdateGradeReq[]
): Promise<PipelineResult<UpdateRes[] | unknown>> => {
  try {
    const updatePromises = updates.map(async (req) => {
      const {
        studentId,
        rosterId,
        attendancePoint,
        midTermPoint,
        finalPoint,
        finalGrade,
        examPoint,
      } = req;

      const existingGrade = await prisma.grade.findUnique({
        where: {
          studentId_rosterId: {
            studentId,
            rosterId,
          },
        },
      });

      if (!existingGrade) {
        return {
          status: 404,
          message: 'notFound',
          data: { studentId, rosterId },
        };
      }

      const updatedGrade = await prisma.grade.update({
        where: {
          studentId_rosterId: {
            studentId,
            rosterId,
          },
        },
        data: {
          attendancePoint,
          midTermPoint,
          finalPoint,
          finalGrade,
          examPoint,
        },
      });

      return {
        status: 204,
        message: 'updated',
        data: {
          attendancePoint: updatedGrade.attendancePoint,
          midTermPoint: updatedGrade.midTermPoint,
          finalPoint: updatedGrade.finalPoint,
          finalGrade: updatedGrade.finalGrade,
          examPoint: updatedGrade.examPoint,
        },
      };
    });

    const results = await Promise.all(updatePromises);

    return {
      status: 200,
      message: 'batchUpdated',
      data: results,
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
