import { fetchTableData } from '@/actions';
import { DepartmentTable } from './DepartmentTable';

const DepartmentPage = async () => {
  const data = await fetchTableData();

  return (
    <div className="container mx-auto rounded-2xl py-10">
      <DepartmentTable data={data} />
    </div>
  );
};

export default DepartmentPage;
