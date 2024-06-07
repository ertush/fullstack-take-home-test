// import { useState } from 'react'

import { TextField, Box } from '@mui/material'
import './App.css'
import { useState, useRef } from 'react'
import { useQuery, gql } from '@apollo/client';
import Book from './components/Book';
import BookSearchItem from './components/BookSearchItem';

import type { Book as BookType } from './components/Book';


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

function App() {

  const [isSearchInput, setIsSearchInput] = useState<Boolean>(false)
  const  titleRef = useRef<string | any>(null)

  const { loading, error, data } = useQuery<any>(GET_BOOKS);


  function handleSearch() {

    setIsSearchInput(true)
    if(titleRef.current !== null && isSearchInput && titleRef.current.value == "") setIsSearchInput(false)

    
  }

  if(error) {
    return <h1>Error!</h1>
  }

  if(loading) {
    return <h1>Loading...</h1>
  }

 

  return (
    <div className='w-full h-full grid grid-rows-[1fr,auto]'>
      <div className='w-full h-[10vh] relative mx-auto'>
        <Box
        sx={{
          width: '50%',
          marginInline: 'auto',
          flexDirection: 'column',
        }}>
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
          {
            isSearchInput &&
          <Box
          sx={{
            width:"100%",
            maxHeight: "200px",
            padding: "5px",
            background: "white",
            flexDirection: "column",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            alignItems: "start",
            display: 'flex',
            gap: "10px",
            overflowY:"scroll"
          }}

          >
            
        
        {
        data?.books?.filter(({title}: BookType) => {
            return title.includes(titleRef.current.value)
        })?.map(({author, coverPhotoURL, title, readingLevel}: BookType, i: number) => (
          <BookSearchItem key={i} author={author} coverPhotoURL={coverPhotoURL} readingLevel={readingLevel} title={title}/>
        ))
        
         }
          </Box>
          }
        </Box>
                
      </div>
      <div className='w-full overflow-scroll-y min-h-[30vh] grid grid-cols-5  items-center justify-center gap-4'>
        {
        data?.books?.map(({author, coverPhotoURL, title, readingLevel}: BookType, i: any) => (
          <Book key={i} author={author} coverPhotoURL={coverPhotoURL} readingLevel={readingLevel} title={title}/>

        ))
         }

      </div>

    
    </div>
  )
}

export default App
