import React, {useState} from "react";
import "./SubmissionItem.tsx";
import { SubmissionItem } from "./SubmissionItem.tsx";
interface SubmissionItemProps {
  title: string;
  date: string;
  status: string;
  id: string;
}

interface SubmissionsListProps {
  submissions: SubmissionItemProps[];
}

export const SubmissionsList: React.FC<SubmissionsListProps> = ({
                                                                    submissions,
                                                                }) => {
    const [submissionItems, setSubmissionItems] = useState(submissions);

    const handleDelete = (id) => {
        setSubmissionItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    if (submissionItems.length === 0) {
        return <h2 className="text-3xl text-center py-20">No ongoing submissions, you're clear!</h2>;
    }

    return (
        <div className="divide-y rounded-lg border">
            {submissionItems.map((submission) => (
                <SubmissionItem {...submission} key={submission.id} onDelete={handleDelete} />
            ))}
        </div>
    );
};