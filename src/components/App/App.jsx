import React from 'react';
import { useState, useEffect } from 'react';
import Searchbar from '../SearchBar/SearchBar';
import Modal from '../Modal/Modal';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { fetchImage } from '../../services/api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { toast, ToastContainer } from 'react-toastify';
import { Container } from './App.styled';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchQuery === '' && page === 1) {
      return;
    }
    async function fetchImg() {
      setLoading(true);
      try {
        const [images, totalHits] = await fetchImage(searchQuery, page);
        // setImages([...(page === 1 ? [] : images), ...images]);
        setImages(prevImages => [...prevImages, ...images]);
        setTotalHits(totalHits);
      } catch (error) {
        setLoading(false);
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    }
    fetchImg();
  }, [searchQuery, page]);

  const closeModal = () => {
    setLargeImageURL('');
  };

  const hasMoreImages = () => {
    return totalHits / 12 > page;
  };

  const dropImages = () => {
    setImages([]);
    setPage(1);
  };

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} dropImages={dropImages} />
      <ImageGallery images={images} handleClick={showModal} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {largeImageURL.length > 0 && (
        <Modal largeImageURL={largeImageURL} closeModal={closeModal} />
      )}
      {images.length !== 0 && hasMoreImages() && (
        <Button handleClick={incrementPage} />
      )}
      {loading && <Loader />}
    </Container>
  );
}
