// AdminClaimLogs.tsx
import { LogsHeader } from "../../components/LogsHeader";
import { Table } from "./components/Table";
import { useEffect, useState } from "react";
import { Pagination } from "../../components/Pagination.tsx";
import { useLocation } from "react-router-dom"; // Import useLocation
import {ListLoader} from "../../../public/Loader/ListLoader";

export default function ClaimLogs() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(
      Number(query.get("page")) || 1
  );
  const [claimData, setClaimData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Added for loading state
  const [error, setError] = useState(null); // Added for error handling
  const [totalPages, setTotalPages] = useState(1); // Added for pagination
  const [selectedOption, setSelectedOption] = useState(''); // Add this line

  const getClaimData = async (page) => {
    setIsLoading(true); // Set loading state to true before fetching data
    try {
      console.log("Fetching data ");
      const response = await fetch(
          `https://recov-backend.vercel.app/api/v1/claim/getClaim?page=${page}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch claims");
      } else {
        setClaimData(data.data);
        console.log(data.data);
        setTotalPages(data.totalPages); // Set total pages
      }
    } catch (err) {
      console.error(err);
      setError(err.message); // Set error state
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  useEffect(() => {
    getClaimData(currentPage);

  }, [currentPage]);

  return (
      <div className="container mx-auto px-4  md:px-6 md:py-12">
        <LogsHeader
            title="Claim Logs"
            placeholder=" Search Claim logs..."
            baseRoute="/home/claim-logs"
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
        />
        {error && <div className="alert alert-error">{error}</div>}
        {isLoading && <ListLoader/>}
        {!isLoading && (
            <>
              <Table data={claimData} onDelete={(itemToDelete) => {
                setClaimData(claimData.filter(item => item._id !== itemToDelete._id));
              }} sortOption={selectedOption}/>
              <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(newPage) => {
                    setCurrentPage(newPage);
                    getClaimData(newPage);
                  }}
              />
            </>
        )}
      </div>
  );
}