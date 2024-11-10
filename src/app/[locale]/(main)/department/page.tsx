import { PaginatedTable } from '@/components';
import { departmentColumn } from '@/types';

const DepartmentPage = async () => {
  return (
    <div className="container mx-auto rounded-2xl py-10">
      <PaginatedTable
        url="/departments/get-list"
        modelName="department"
        columns={departmentColumn}
        defaultKeys={['name', 'code', 'detail']}
        tNamespace="department"
        initialPageSize={10}
      />
    </div>
  );
};

export default DepartmentPage;
