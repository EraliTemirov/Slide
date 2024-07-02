import {SearchResult} from './SearchResult'

interface Result {
  id: number
  name: string
  pagesCount: number
  lang: string
  image?: string
}

interface SearchResultsListProps {
  results: Result[]
}

export const SearchResultsList = ({results}: SearchResultsListProps): JSX.Element => {
  return (
    <div className='results-list flex justify-center flex-wrap gap-5 mt-8'>
      {results.map((result: Result) => (
        <SearchResult result={result} key={result.id} />
      ))}
    </div>
  )
}
