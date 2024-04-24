
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }: { results: string[] }): JSX.Element => {
  return (
    <div className="results-list flex justify-center flex-wrap gap-2 mt-8">
    {results.map((result: any, id: number) => {
      return <SearchResult result={result} key={id} />;
    })}
  </div>
  );
};