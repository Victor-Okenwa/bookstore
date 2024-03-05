import BookSingle from './BookSingle';

const BooksCard = ({ books }) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {books.map((item) => (
                <BookSingle key={item._id} item={item} />
            ))}
        </div>
    )
}

export default BooksCard;