// import React from "react";
export const SearchResult = ({ result }: { result: any }): JSX.Element => {
  return (
    <div className="search-result">
      {result?.status}
    </div>
  );
};