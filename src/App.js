import React, { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";

import "react-image-lightbox/style.css";
import { handleFetchUserImagesList } from "./api/public.api.helper";
import useInfiniteScroll from "./components/useInfiniteScroll/useInfiniteScroll";
import "./App.css";

function App() {
  const [imagesList, setImagesList] = useState([]);
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const count = 10;

  useEffect(() => {
    fetchImagesList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems); // create hook for infinite scroll

  function fetchMoreListItems() {
    fetchImagesList();
    setIsFetching(false);
  }

  const fetchImagesList = async () => {
    const client_id = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
    const params = {
      page,
      client_id,
      count,
    };
    const imagesListResponse = await handleFetchUserImagesList(params);
    setPage(page + 1);
    setImagesList([...imagesList, ...imagesListResponse]);
  };

  return (
    <div className="images-list">
      {imagesList.map((image, index) => (
        <div
          key={image.id}
          className="image-item"
          onClick={() => {
            setPhotoIndex(index);
            setIsOpen(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <img
            src={image.urls.small}
            alt={image.id}
            height={300}
            width={400}
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
      {isFetching && "Fetching more list items..."}
      {isOpen && (
        <Lightbox
          mainSrc={imagesList[photoIndex].urls.regular}
          nextSrc={
            imagesList[(photoIndex + 1) % imagesList.length].urls.regular
          }
          prevSrc={
            imagesList[(photoIndex + imagesList.length - 1) % imagesList.length]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + imagesList.length - 1) % imagesList.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % imagesList.length)
          }
        />
      )}
    </div>
  );
}

export default App;
