
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }: { results: string[] }): JSX.Element => {
  return (
    <div className="results-list">
    {results.map((result: any, id: number) => {
      return <SearchResult result={result} key={id} />;
    })}
  </div>
  );
};