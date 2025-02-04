
import { Header } from '../../components/Header.tsx';
import { ReportForm } from '../../components/ReportForm.tsx';
import { Tips } from '../../components/Tips.tsx';

interface Tip {
  title: string;
  description: string;
}

export default function LostReport() {
  const tips: Tip[] = [
    {
      title: 'Check for ID',
      description:
        'Look for any identification in the item to help locate the owner.',
    },
    {
      title: 'Report to Local Authorities',
      description:
        'If the item is valuable or important, report it to the local authorities.',
    },
    {
      title: 'Ask nearby people',
      description:
        'Check with people in the vicinity if they have seen your lost item.',
    },
  ];

  return (
    <main className="flex flex-col bg-white py-12 px-4 sm:px-6 lg:px-8">
      <Header
        title="Lost Something?"
        paragraph="Submit a report and we'll help you find your item."
        iconSize="h-28 w-28"
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <ReportForm title="Lost" formType="Lost" />
        <div>
          <Tips tips={tips} />
        </div>
      </div>
    </main>
  );
}
