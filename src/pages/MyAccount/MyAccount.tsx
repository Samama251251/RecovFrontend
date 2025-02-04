import { Header } from "../../components/Header.tsx";
import { AccountDetails } from "./components/AccountDetails.tsx";
import { SubmissionsList } from "./components/SubmissionList.tsx";
//import { Loader } from "../../../public/Loader/Loader.tsx";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/userContext.tsx";

interface Submission {
  id: string;
  title: string;
  date: string;
  status: "Found" | "Lost";
}

export default function MyAccount() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { token } = useUserContext();

  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          "https://recov-backend.vercel.app/api/v1/items/userItems",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch submissions");
        }

        const data = await response.json();
        // Transform API data to match Submission interface if necessary
        const transformedSubmissions: Submission[] = data.data.items.map((item: any) => ({
          id: item.id,
          title: item.title,
          date: item.createdAt,
          status: item.status as "Found" | "Lost"
        }));
        setSubmissions(transformedSubmissions);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [token]);

  return (
    <main className="container mx-auto py-12 px-12 md:px-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <Header title="My Account" paragraph="" iconSize="h-28 w-28" />
          <AccountDetails />
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl my-2 font-semibold">Ongoing Submissions</h2>
            {error && <div className="text-red-500">Error: {error.message}</div>}
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <SubmissionsList submissions={submissions} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
