import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Top from '@/components/analysis/Top';
import List from '@/components/analysis/List';

export default function AnalysisPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (rawRows.length === 0) {
      router.push({ name: 'Home' });
    }
  }, []);

  //We'll need a context here... most likely.
  const rawRows = useSelector((state) => state.rawRows);

  return (
    <>
      {rawRows.length > 0 && (
        <>
          <Top selectedTab={selectedTab} className="mb-4" onChange={setSelectedTab} />
          <List selectedTab={selectedTab} />
        </>
      )}
    </>
  );
}
