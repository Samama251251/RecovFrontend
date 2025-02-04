import {
  PackageIcon,
  Trash2Icon,
} from "../../../../public/itemIcons/itemIcons.tsx";
import { StatusBadge } from "../../../components/StatusBadge.tsx";
import { Button } from "../../../../@/components/ui/button.tsx";

interface SubmissionItemProps {
    title: string;
    date: string;
    id: string;
    status: "Lost" | "Found";
    onDelete: (id: string) => void;
}


const deleteSubmissionAndLog = async (submissionId, onDelete) => {
    try {
        // Delete the submission
        const response = await fetch(
            `http://localhost:3000/api/v1/items/deleteRequest?submissionId=${submissionId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Delete the log

        // Refresh the submission list and logs here
        onDelete(submissionId);
    } catch (error) {
        console.error("Error:", error);
    }
};

export const SubmissionItem: React.FC<SubmissionItemProps> = ({
  title,
  date,
  status,
  id, onDelete,
}) => (
  <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4 px-4 py-3">
    <div className="flex h-20 w-20 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
      <PackageIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
    </div>
    <div className="grid gap-1">
      <div className="font-medium text-xl">{title}</div>
      <div className="text-md text-gray-500 dark:text-gray-400">
        Reported on {new Date(date).toLocaleDateString()}
      </div>
    </div>
    <div className="flex items-center gap-5">
      <StatusBadge status={status} />
        <Button
            onDoubleClick={() => deleteSubmissionAndLog(id, onDelete)}
            className="px-4 py-6 text-red-500 hover:bg-red-100 focus:ring-red-500"
            size="sm"
            variant="outline"
        >
        <Trash2Icon className="w-6 h-6" />
      </Button>
    </div>
  </div>
);
