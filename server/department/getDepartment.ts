/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '@/prisma';
import { GetListProps, GetListResponse, PaginationMeta, PipelineResult } from '@/types';
import { Department, Prisma } from '@prisma/client';
import { logger } from '../utils';

export const getDepartment = async (
  props: GetListProps<Department>
): Promise<PipelineResult<GetListResponse<Department> | unknown>> => {
  try {
    const { pageIndex, pageSize, sortBy, search, filters } = props;

    // Build the where clause for Prisma
    let where: Prisma.DepartmentWhereInput = {};

    // Handle search
    if (search?.value) {
      const searchFields = search.fields || ['name', 'description']; // default search fields
      where.OR = searchFields.map((field) => ({
        [field]: {
          contains: search.value,
          mode: 'insensitive', // case-insensitive search
        },
      }));
    }

    // Handle filters
    if (filters) {
      const fieldFilters: any = {};

      // Process simple field filters
      Object.entries(filters).forEach(([key, filter]) => {
        if (key !== 'AND' && key !== 'OR' && filter) {
          switch (filter.operator) {
            case 'eq':
              fieldFilters[key] = { equals: filter.value };
              break;
            case 'neq':
              fieldFilters[key] = { not: { equals: filter.value } };
              break;
            case 'gt':
              fieldFilters[key] = { gt: filter.value };
              break;
            case 'gte':
              fieldFilters[key] = { gte: filter.value };
              break;
            case 'lt':
              fieldFilters[key] = { lt: filter.value };
              break;
            case 'lte':
              fieldFilters[key] = { lte: filter.value };
              break;
            case 'contains':
              fieldFilters[key] = {
                contains: filter.value as string,
                mode: 'insensitive',
              };
              break;
            case 'in':
              fieldFilters[key] = { in: filter.value as any[] };
              break;
            default:
              fieldFilters[key] = { equals: filter.value };
          }
        }
      });

      // Combine field filters with existing where clause
      where = { ...where, ...fieldFilters };

      // Process AND conditions
      if (filters.AND?.length) {
        where.AND = filters.AND.map((condition) => ({
          [condition.field]: {
            // Map the operator to Prisma's filter syntax
            ...(condition.operator === 'contains'
              ? { contains: condition.value, mode: 'insensitive' }
              : condition.operator === 'in'
                ? { in: condition.value }
                : { equals: condition.value }),
          },
        }));
      }

      // Process OR conditions
      if (filters.OR?.length) {
        where.OR = filters.OR.map((condition) => ({
          [condition.field]: {
            // Map the operator to Prisma's filter syntax
            ...(condition.operator === 'contains'
              ? { contains: condition.value, mode: 'insensitive' }
              : condition.operator === 'in'
                ? { in: condition.value }
                : { equals: condition.value }),
          },
        }));
      }
    }

    // Build the orderBy clause
    const orderBy = sortBy?.map((sort) => ({
      [sort.field]: sort.order,
    })) || [{ id: 'desc' }]; // default sorting

    // Get total count for pagination
    const totalItems = await prisma.department.count({ where });
    const totalPages = Math.ceil(totalItems / pageSize);

    // Get paginated data
    const departments = await prisma.department.findMany({
      where,
      orderBy,
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
    });

    // Prepare pagination metadata
    const meta: PaginationMeta = {
      totalItems,
      totalPages,
      currentPage: pageIndex,
      hasNextPage: pageIndex < totalPages,
      hasPreviousPage: pageIndex > 1,
    };

    // Return successful response
    return {
      status: 200,
      message: 'retrieved',
      data: {
        data: departments,
        meta,
      },
    };
  } catch (error) {
    logger.error('Error getting departments', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
