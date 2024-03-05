import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book created successfully', { variant: 'success' })
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error', { variant: 'error' })
        setLoading(false);
      })
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="test-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="title" className="text-xl mr-4 text-gray-500">Title</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="my-4">
          <label htmlFor="author" className="text-xl mr-4 text-gray-500">Author</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="my-4">
          <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="number"
            id="publishYear"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)} />
        </div>
        <button className="p-2 bg-sky-300" onClick={handleSaveBook}>Save</button>
      </div>
    </div>
  )
}

export default CreateBook