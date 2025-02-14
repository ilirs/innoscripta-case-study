import React, { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
import { FetchContext } from '../strategies';
import { NewsAPIStrategy } from '../strategies/NewsApi';
import { NYTimesStrategy } from '../strategies/NyTimes';
import { Article } from '../types/Article';
import { useDebounce } from '../hooks/useDebounce';

const fetchContext = new FetchContext();
fetchContext.addStrategy(new NewsAPIStrategy());
fetchContext.addStrategy(new NYTimesStrategy());

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [debounceVal, setDebounceVal] = useState('');
  //   const [source, setSource] = useState('');

  const [category, setCategory] = useState(
    localStorage.getItem('category') || ''
  );

  const debounceValue = useDebounce(searchInput, 1000);

  const fetchArticles = async (keyword: string, category: string) => {
    const allArticles = await fetchContext.fetchAllArticles({
      q: keyword, // Pass the debounced keyword
      category: category,
      //   source: source,
    });
    setArticles(allArticles);
  };

  // Handle search input change
  useEffect(() => {
    if (debounceVal !== '') {
      fetchArticles(debounceVal, category);
    }
  }, [debounceVal, category]);

  // Fetch articles on inital load
  useEffect(() => {
    fetchArticles(debounceVal, category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDebounceVal(searchInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  // Extract unique categories
  const uniqueCategories = Array.from(
    new Set(articles.map((article) => article?.category))
  ).filter(Boolean); // Remove undefined or null categories

  // Extract unique source
  //   const uniqueSource = Array.from(
  //     new Set(articles.map((article) => article.source))
  //   ).filter(Boolean);

  return (
    <div className="p-4">
      {/* Search bar */}
      <SearchBar
        onSearch={(keyword) => setSearchInput(keyword)} // Update search input
      />

      {/* Category filter */}
      <div className="mb-4">
        <label htmlFor="dateFilter" className="mr-2">
          Category:
        </label>
        <select
          id="dateFilter"
          className="p-2 border rounded"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            localStorage.setItem('category', e.target.value);
          }} // Update date filter
        >
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
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
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
