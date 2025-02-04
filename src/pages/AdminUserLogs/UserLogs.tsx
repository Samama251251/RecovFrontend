// UserLogs.tsx
import { LogsHeader } from "../../components/LogsHeader.tsx";
import { Table } from "./components/Table.tsx";
import { Pagination } from "../../components/Pagination.tsx";
import { useState, useEffect } from "react"; // Added useEffect
import {ListLoader} from "../../../public/Loader/ListLoader"; // Import ListLoader

export default function AdminReportLogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [claimData, setClaimData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Added for loading state
  const [error, setError] = useState<string | null>(null); // Added for error handling
  const [totalPages, setTotalPages] = useState(1); // Added for pagination
  const [selectedOption, setSelectedOption] = useState("newest"); // Add this for LogsHeader

  const getClaimData = async () => {
    setIsLoading(true); // Set loading state to true before fetching data
    try {
      console.log("Fetching data ");
      const response = await fetch(
          `https://recov-backend.vercel.app/api/v1/claim/getClaim?page=${currentPage}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch claims");
      } else {
        setClaimData(data.data);
        setTotalPages(data.totalPages); // Set total pages
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message); // Set error state
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  useEffect(() => {
    getClaimData();
  }, [currentPage]);

  const handleDelete = async (itemToDelete: string) => {
    // Implementation here
    console.log('Deleting:', itemToDelete);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Added error message display
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className="container mx-auto px-4  md:px-6 md:py-12">
        <LogsHeader
            title="User Logs"
            placeholder="          User Claim logs..."
            baseRoute="/home/user-logs"
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
        />
        {isLoading && <ListLoader/>}
        {!isLoading && (
            <>
              <Table data={claimData} onDelete={handleDelete} />
              <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages} // This should be calculated based on total number of records
                  onPageChange={handlePageChange}
              />
            </>
        )}
      </div>
  );
}