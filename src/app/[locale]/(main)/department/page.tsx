import { fetchData } from '@/actions';
import { TableWrapper } from '@/components';
import { departmentColumn } from '@/models';

const DepartmentPage = async () => {
  const data = await fetchData('/departments/get-department');

  return (
    <div className="container mx-auto rounded-2xl py-10">
      <TableWrapper data={data} column={departmentColumn} />
    </div>
  );
};

export default DepartmentPage;
