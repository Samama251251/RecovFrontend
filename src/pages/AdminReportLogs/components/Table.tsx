// Table.tsx
import { TableRow } from "./TableRow.tsx";

export function Table({ data , onDelete, sortOption }) {

  const sortedData = [...data].sort((a, b) => {
    switch (sortOption) {
      case 'dateReported':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'status':
        return a.status.localeCompare(b.status);

    }
  });

  return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full table-auto ">
          <thead>
          <tr className="bg-gray-100 text-gray-600 font-medium">
            <th className="px-8 py-4 text-3xl text-left">User</th>
            <th className="px-20 py-4 text-3xl text-left">Item</th>
            <th className="px-12 py-4 text-3xl text-left">Status</th>
            <th className="px-28 py-4 text-3xl text-left">Actions</th>
          </tr>
          </thead>
          <tbody>
          {sortedData.map((item) => ( // Use sortedData instead of data
              <TableRow key={item._id} data={item} onDelete={() => onDelete(item)} />
          ))}
          </tbody>
        </table>
      </div>
  );
}