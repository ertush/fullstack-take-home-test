// import { useState } from 'react'

import { TextField, Box, Modal, Typography, Button } from '@mui/material'
import './App.css'
import { useState, useRef, createContext, Fragment} from 'react'
import { useQuery, gql } from '@apollo/client';
import Book from './components/Book';
import BookSearchItem from './components/BookSearchItem';

import type { Book as BookType } from './components/Book';
import BookDetails from './components/BookDetail';
import AddBookView from './components/AddBookView';
import FavouriteBooks from './components/FavouriteBooks';
import { read } from 'fs';
import BookReadListView from './components/BookReadListView';


const GET_BOOKS = gql`
  query Books {
  books {
    author
    coverPhotoURL
    readingLevel
    title
  }
}

`;

export type AddToReadListContextType = {books: BookType[], setBooks: React.Dispatch<React.SetStateAction<BookType[]>>} | null

export const AddToReadListContext = createContext<AddToReadListContextType>(null)
export const ModalControlContext = createContext<any>(null)
export const AddBookViewModalContext = createContext<any>(null)
export const FavouriteBooksContext = createContext<any>(null)
export const SetSelectedBookContext = createContext<any>(null)
export const SearchSelectContext = createContext<any>(null)
export const SearchInputContext = createContext<any>(null)


function App() {

  const  titleRef = useRef<string | any>(null)


  const [isSearchInput, setIsSearchInput] = useState<Boolean>(false)
  const { loading, error, data } = useQuery<any>(GET_BOOKS);
  const [books, setBooks] = useState<Array<BookType>>(data?.books)
  const [readList, setReadList] = useState<Array<BookType>>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openAddBookModal, setOpenAddBookModal] = useState<boolean>(false)
  const [openFavouriteBookModal, setOpenFavouriteBooksList] = useState<boolean>(false)
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null)
  const [searchSelectedBook, setSearchSelectedBook] = useState<BookType | null>(null)

  function handleSearch() {

    console.log(isSearchInput)


    if(!isSearchInput) setIsSearchInput(true)
    
    if(titleRef.current.value == "") setIsSearchInput(false)

     setBooks(() => {
     return data.books?.filter(({title}: BookType) => {
            return title?.toLocaleLowerCase().trim().includes(
              titleRef.current.value.toLocaleLowerCase().trim()
            )
        })
    })   

  }


  function handleClose() {
    setOpenModal(false)
  }

  function handleCloseAddBookModal() {
    setOpenAddBookModal(false)
  }

  function handleCloseFavouriteBooksList() {
    setOpenFavouriteBooksList(false)
  }

  

  if(error) {
    return <h1>Error: Unable to Books!</h1>
  }

  if(loading) {
    return <h1>Loading...</h1>
  }

 

  return (
    <>
    <AddToReadListContext.Provider value={{books: readList, setBooks:setReadList}}>
    
    <ModalControlContext.Provider value={setOpenModal}>
      <SetSelectedBookContext.Provider value={setSelectedBook}>

      <div className='w-full h-full grid grid-rows-[1fr,auto]'>
        {
              <pre>
                {
                  JSON.stringify({readList}, null, 2)
                }
              </pre>
            }
        <div className='w-full z-50 h-[10vh] relative mx-auto'>
          <Box
          sx={{
            width: '50%',
            marginInline: 'auto',
            flexDirection: 'column',
          }}>
            <Box
            display={'flex'}
            gap={4}
            alignItems={'center'}
            width={'100%'}
            >
               <TextField
            hiddenLabel
            placeholder='Search for a book'
            defaultValue=""
            variant="filled"
            size="small"
            inputRef={titleRef}
            onChange={handleSearch}
            className="w-full"
            />

            <FavouriteBooksContext.Provider  value={setOpenFavouriteBooksList}>
              <FavouriteBooks bookCount={readList.length} />
            </FavouriteBooksContext.Provider>

            </Box>
           
            {
              isSearchInput &&
              <AddBookViewModalContext.Provider value={setOpenAddBookModal}>
              <SearchSelectContext.Provider value={setSearchSelectedBook} >
            <Box
            
            sx={{
              width:"100%",
              maxHeight: "200px",
              padding: "5px",
              background: "#f0f0f0",
              flexDirection: "column",
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
              alignItems: "start",
              display: 'flex',
              gap: "10px",
              overflowY:"scroll",
              
            }}



            >
              
          
          {
          books?.map(({author, coverPhotoURL, title, readingLevel}: BookType, i: number) => (
            <SearchInputContext.Provider key={i} value={setIsSearchInput}>
            <BookSearchItem author={author} coverPhotoURL={coverPhotoURL} readingLevel={readingLevel} title={title}/>
            </SearchInputContext.Provider>
          ))
          
          }
            </Box>
            </SearchSelectContext.Provider>
            </AddBookViewModalContext.Provider>
            }
          </Box>
                  
        </div>
        <div className='w-full overflow-scroll-y min-h-[30vh] grid grid-cols-5  items-center justify-center gap-4'>
          {
          data.books?.map(({author, coverPhotoURL, title, readingLevel}: BookType, i: number) => (
            <Book key={i} author={author} coverPhotoURL={coverPhotoURL} readingLevel={readingLevel} title={title}/>

          ))
          }

        </div>

      
      </div>
      </SetSelectedBookContext.Provider>
    </ModalControlContext.Provider>
 
      <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={
        {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: "6px",
          ":focus": {
            outline: 'none'
          },
          p: 3,
        }
      }>
        <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={'100%'}
        >
          <Typography id="modal-modal-title" variant="h5" component="h2">
          Book Details
        </Typography>

        <Button onClick={() => setOpenModal(false)} sx={{color:'#335C6E', fontWeight: 600}}>close</Button>

        </Box>
        
        <BookDetails
          author={selectedBook?.author}
          title={selectedBook?.title}
          readingLevel={selectedBook?.readingLevel}
          coverPhotoURL={selectedBook?.coverPhotoURL}

        />
      </Box>
    </Modal>
  
  {/* Search Book View Modal */}
    <Modal
      open={openAddBookModal}
      onClose={handleCloseAddBookModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={
        {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: "6px",
          ":focus": {
            outline: 'none'
          },
          p: 3,
        }
      }>
        <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={'100%'}
        >
        <Typography id="modal-add-books" variant="h5" component="h2">
          Add Books to Read List
        </Typography>

        <Button onClick={handleCloseAddBookModal} sx={{color:'#335C6E', fontWeight: 600}}>close</Button>

        </Box>
      
        
            <AddBookView
            author={searchSelectedBook?.author}
            title={searchSelectedBook?.title}
            readingLevel={searchSelectedBook?.readingLevel}
            coverPhotoURL={searchSelectedBook?.coverPhotoURL}
          />
               
      </Box>
    </Modal>

{/* Favourites Book Modal */}

<Modal
      open={openFavouriteBookModal}
      onClose={handleCloseFavouriteBooksList}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
    >
      <Box 
      width="500px"
      sx={
        {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          maxHeight: '700px',
          overflowY: 'scroll',
          borderRadius: "6px",
          ":focus": {
            outline: 'none'
          },
          p: 3,
    
        }
      }>
        {/* <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width='500px'
        > */}
        <Typography id="modal-add-books" variant="h5" component="h2">
          My Favourite Books
        </Typography>

        {/* <Button onClick={handleCloseFavouriteBooksList} sx={{color:'#335C6E', fontWeight: 600}}>close</Button>

        </Box> */}
      
           {
            
            Array.from(new Set(readList), ({author, coverPhotoURL, title, readingLevel}, i) => (
              <Fragment key={i}>
              <BookReadListView
                author={author}
                title={title}
                readingLevel={readingLevel}
                coverPhotoURL={coverPhotoURL}
      
              />
               <hr className="h-1 w-full my-1"></hr>

              </Fragment>
            ))
           }
               
      </Box>
    </Modal>

    </AddToReadListContext.Provider>

  
    </>
  )
}

export default App
