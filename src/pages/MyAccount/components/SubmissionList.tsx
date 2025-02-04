import React from "react";
import { SubmissionItem } from "./SubmissionItem";

interface SubmissionItemProps {
  id: string;
  title: string;
  date: string;
  status: "Found" | "Lost";  // Restricting status to specific values
}

interface SubmissionsListProps {
  submissions: SubmissionItemProps[];
}

export const SubmissionsList: React.FC<SubmissionsListProps> = ({ submissions }) => {
  const [submissionItems, setSubmissionItems] = React.useState<SubmissionItemProps[]>(submissions);

  const handleDelete = (id: string) => {
    setSubmissionItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  if (submissionItems.length === 0) {
    return <h2 className="text-3xl text-center py-20">No ongoing submissions, you're clear!</h2>;
  }

  return (
    <div className="divide-y rounded-lg border">
      {submissionItems.map((submission) => (
        <SubmissionItem 
          key={submission.id}
          {...submission}
          onDelete={() => handleDelete(submission.id)}
        />
      ))}
    </div>
  );
};