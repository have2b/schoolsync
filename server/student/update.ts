import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Gender } from '@prisma/client';
import { logger } from '../utils';

interface UpdateStudentReq {
  name?: string;
  dob?: string;
  gender?: string;
  address?: string;
  phone?: string;
  groupId?: number;
}

interface UpdateStudentRes {
  id: number;
}

export const updateStudent = async (
  id: string,
  req: UpdateStudentReq
): Promise<PipelineResult<UpdateStudentRes | unknown>> => {
  try {
    const { name, dob, gender, address, phone, groupId } = req;

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

    // Check if phone exists in the request
    if (phone) {
      const existedPhoneStudent = await prisma.student.findFirst({
        where: {
          phone,
        },
      });

      // If a phone match is found and it belongs to a different student
      if (existedPhoneStudent && existedPhoneStudent.id !== existingStudent.id) {
        return {
          status: 400,
          message: 'duplicatedPhone',
          data: null,
        };
      }
    }

    const updatedStudent = await prisma.student.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name ?? existingStudent.name,
        dob: new Date(dob ?? existingStudent.dob),
        gender: (gender as Gender) ?? existingStudent.gender,
        address: address ?? existingStudent.address,
        phone: phone ?? existingStudent.phone,
        groupId: groupId ?? existingStudent.groupId,
      },
    });

    return {
      status: 204,
      message: 'updated',
      data: updatedStudent.id,
    };
  } catch (error) {
    logger.error('Error updating student', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
