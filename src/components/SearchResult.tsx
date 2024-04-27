import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mainApiInstance from "./mainApiInstance";
import PlaceholderCards from "./PlaseholderCards"

interface SearchResultProps {
  result: {
    id: number;
    name: string;
    pagesCount: number;
    lang: string;
    image?: string;
  };
}

export const SearchResult = ({ result }: SearchResultProps): JSX.Element | null => {
  const [fetchedData, setFetchedData] = useState<{ image?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (result?.id) {
      fetchData(result.id);
    }
  }, []);

  const fetchData = async (id: number) => {
    try {
      setLoading(true);
      const response = await mainApiInstance.get(`/images/${id}`);
      const data = response.data.data;
      console.log(data);
      setFetchedData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!result || !result.id) {
    return null;
  }

  return (
    <div className="search-result-link border border-x-2 rounded-lg w-[350px] shadow-lg transition-all duration-400 hover:scale-110">
        <Link
          to={`/prezentations/${result.id}`}
        >
          {loading ? (
        <PlaceholderCards />
      ) : (



          <div className="image-container w-full rounded-sm">
            <img src={fetchedData?.image} alt="Presentation" />
          </div>
      )}
          <hr />
          <div className="info p-4 bottom-0">
            <h4 className="text-sm">
              <span className="font-bold">Name:</span>{" "}
              {result.name.slice(0, 30)}
            </h4>
            <p className="text-sm">
              <span className="font-bold">Page count:</span> {result.pagesCount}
            </p>
            <p className="text-sm">
              <span className="font-bold">Language:</span> {result.lang}
            </p>
          </div>
        </Link>
    </div>
  );
};
