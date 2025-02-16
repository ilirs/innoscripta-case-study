import React from 'react';
import { SourceType } from '../pages/Home';

interface SourcesCheckboxProps {
  sources: string[];
  onCheckboxChange: (source: SourceType) => void;
}

const sourceMap = {
  newsapi: 'newsapi',
  nytimes: 'nytimes',
  theguardian: 'theguardian',
};

const SourcesCheckbox: React.FC<SourcesCheckboxProps> = ({
  sources,
  onCheckboxChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 lg:gap-6 md:items-center mb-2">
      <span className="font-semibold">Sources:</span>
      {Object.keys(sourceMap).map((key) => {
        const source = key;
        return (
          <div key={source} className="flex gap-2">
            <input
              type="checkbox"
              id={source}
              checked={sources.includes(source)}
              onChange={() => onCheckboxChange(source as SourceType)}
            />
            <label htmlFor={source}>{source}</label>
          </div>
        );
      })}
    </div>
  );
};

export default SourcesCheckbox;
