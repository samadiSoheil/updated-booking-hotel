import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();

const initialData = {
  selectedBookmarks: null,
  bookmarks: [],
  isLoading: false,
  error: false,
};

const reducerFunc = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/create":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...action.payload],
      };
    case "select/bookmark":
      return {
        ...state,
        selectedBookmarks: action.payload,
      };
    case "bookmarks/add":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case "bookmarks/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((i) => i.id != +action.payload),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: toast.error(action.payload),
      };
    default:
      return { ...state };
  }
};

const BookMarksProvider = ({ children }) => {
  const [{ isLoading, bookmarks, selectedBookmarks }, dispatch] = useReducer(
    reducerFunc,
    initialData
  );

  useEffect(() => {
    const fetchAgain = async () => {
      try {
        dispatch({ type: "loading" });
        const { data } = await axios.get("http://localhost:5000/bookmarks");
        dispatch({ type: "bookmarks/create", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.response.statusText });
      }
    };
    fetchAgain();
  }, []);

  const updaterSelectedBookmarks = (elemId) => {
    dispatch({ type: "select/bookmark", payload: +elemId });
  };

  const createNewBookmark = async (locationData) => {
    try {
      dispatch({ type: "loading" });
      const response = await axios.post("http://localhost:5000/bookmarks", {
        ...locationData,
      });
      if (response.status == 201) {
        toast.success("Bookmark added successfully");
        dispatch({ type: "select/bookmark", payload: +locationData.id });
        dispatch({ type: "bookmarks/add", payload: locationData });
      }
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  };

  const deleteBookmark = async (id) => {
    try {
      dispatch({ type: "loading" });
      const response = await axios.delete(`http://localhost:5000/bookmarks/${id}`);
      if (response.status == 200) {
        toast.success("Bookmark deleted successfully");
        dispatch({ type: "bookmarks/deleted", payload: id });
      }
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        updaterSelectedBookmarks,
        selectedBookmarks,
        createNewBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

const useBookmarks = () => {
  return useContext(BookmarkContext);
};

export { useBookmarks };
export default BookMarksProvider;
