import axios from "axios";
axios.interceptors.response.use(response => response.data);

const urls = [
  `${process.env.REACT_APP_API_ENDPOINT}/item-schemas/${name}`,
  `${process.env.REACT_APP_API_ENDPOINT}/collection-schemas/${name}`
];

const asyncFetch = (name: string) => {
  return async (collectionName: string) => {
    const [pageRes, countRes] = await Promise.all([
      axios.get(urls[0]),
      axios.get(urls[1])
    ]);
    return { countRes, pageRes };
  };
};

const fetchData = async () => {
  const result = await axios("http://hn.algolia.com/api/v1/search?query=redux");
  return result;
};

export default {
  asyncFetch: fetchData()
};
