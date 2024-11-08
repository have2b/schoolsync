import { PaginatedDataTable } from '@/components';
import { departmentColumn } from '@/models';

const DepartmentPage = async () => {
  return (
    <div className="container mx-auto rounded-2xl py-10">
      <PaginatedDataTable
        url="/departments/get-department"
        columns={departmentColumn}
        tNamespace="department"
        initialPageSize={10}
      />
    </div>
  );
};

export default DepartmentPage;
