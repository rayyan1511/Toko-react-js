import React, { useEffect, useReducer } from "react";
import {
  getAll,
  getAllByTag,
  getAllTags,
  search,
} from "../../services/barangService";
// import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { useParams } from "react-router-dom";
// import Search from "../../components/Search/Search";
// import Tags from "../../components/Tags/Tags";
// import NotFound from "../../components/NotFound/NotFound";
import Section from "../../components/Section/Section";
import CategorySection from "../../components/CategorySection/CategorySection";


const initialState = { barangg: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "BARANG_LOADED":
      return { ...state, barangg: action.payload };
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { barangg, tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then((tags) =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );

    const loadFoods = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    loadFoods.then((barangg) =>
      dispatch({ type: "BARANG_LOADED", payload: barangg })
    );
  }, [searchTerm, tag]);

  return (
    <>
      <Section/>
      <CategorySection/>
    </>
  );
}
