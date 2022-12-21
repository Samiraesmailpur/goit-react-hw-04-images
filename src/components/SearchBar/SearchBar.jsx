import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  Searchbar,
  SearchForm,
  SearchFormInput,
  SearchFormButton,
} from './SearchBar.styled';

export default function SearchBar({ dropImages, onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.error('Please enter some keywords to search.');
    }
    dropImages();
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <Searchbar className="searchbar">
      <SearchForm className="form" onSubmit={handleSubmit}>
        <SearchFormButton type="submit" className="button">
          <AiOutlineSearch />
        </SearchFormButton>

        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchQuery}
        />
      </SearchForm>
    </Searchbar>
  );
}
