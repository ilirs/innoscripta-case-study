import React, { useState, useEffect, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import ArticleCard from 'components/ArticleCard';
import SearchBar from 'components/SearchBar';
import SourcesCheckbox from 'components/SourcesCheckbox';
import { FetchContext } from 'strategies';
import { NewsAPIStrategy } from 'strategies/NewsApi';
import { NYTimesStrategy } from 'strategies/NyTimes';
import { TheguardianStrategy } from 'strategies/TheGuardian';
import { Article } from 'types/Article';
import { useDebounce } from 'hooks/useDebounce';
import { categories, Category } from 'utils/categories';

const sourceMap = {
  newsapi: new NewsAPIStrategy(),
  nytimes: new NYTimesStrategy(),
  theguardian: new TheguardianStrategy(),
};

export type SourceType = keyof typeof sourceMap;

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [debounceVal, setDebounceVal] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debounceValue = useDebounce(searchInput, 1000);

  // Get the data from localStorage (user personalized news feed)
  const [sources, setSources] = useState<SourceType[]>(() => {
    const storedSources = localStorage.getItem('sources');
    return storedSources ? JSON.parse(storedSources) : ['nytimes'];
  });

  const [category, setCategory] = useState<Category>(
    (localStorage.getItem('category') as Category) || ''
  );

  const fetchContext = useMemo(() => {
    const fetchContextNews = new FetchContext();
    sources.map((source) => fetchContextNews.addStrategy(sourceMap[source]));
    return fetchContextNews;
  }, [sources]);

  const handleCheckboxChange = (source: SourceType) => {
    setSources((prevSources) => {
      const newSources = prevSources.includes(source)
        ? prevSources.filter((item) => item !== source)
        : [...prevSources, source];

      localStorage.setItem('sources', JSON.stringify(newSources));

      return newSources;
    });
  };

  const fetchArticles = async (keyword: string, category: Category) => {
    setIsLoading(true);

    try {
      const allArticles = await fetchContext.fetchAllArticles({
        q: keyword,
        category: category,
        from: startDate,
        to: endDate,
      });

      setArticles(allArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  useEffect(() => {
    if (debounceVal !== '') {
      fetchArticles(debounceVal, category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceVal, category]);

  // Fetch articles on inital load
  useEffect(() => {
    fetchArticles(debounceVal, category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sources, startDate, endDate]);

  useEffect(() => {
    setDebounceVal(searchInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  return (
    <div className="p-4 flex flex-col">
      {/* Search bar */}
      <SearchBar
        onSearch={(keyword) => setSearchInput(keyword)} // Update search input
      />

      {/* Source type checkbox */}
      <SourcesCheckbox
        sources={sources}
        onCheckboxChange={handleCheckboxChange}
      />

      {/* Date picker  */}
      <div className="flex mb-2 flex-col gap-2 md:flex-row">
        <div>
          <span className="mr-2 font-semibold">From:</span>
          <DatePicker selected={startDate} onChange={setStartDate} />
        </div>
        <div>
          <span className="mr-2 font-semibold">To:</span>
          <DatePicker selected={endDate} onChange={setEndDate} />
        </div>
      </div>

      {/* Category filter */}
      <div className="mb-4">
        <label htmlFor="dateFilter" className="mr-2 font-semibold">
          Category:
        </label>
        <select
          id="dateFilter"
          className="p-2 border rounded"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as Category);
            localStorage.setItem('category', e.target.value);
          }}
        >
          {categories.map((category, index) => (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))
        ) : isLoading ? (
          <p>Loading...</p>
        ) : sources.length === 0 ? (
          <p>Please select a source</p>
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
