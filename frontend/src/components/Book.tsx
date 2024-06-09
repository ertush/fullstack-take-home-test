import { Box, Button } from "@mui/material"
import { useContext } from "react"
import { AddToReadListContext, ModalControlContext, SetSelectedBookContext } from "../App"
import images from '../assets/images.json'

export type Book = {
  author: string | null | undefined,
  coverPhotoURL: string | null | undefined,
  readingLevel: string | null | undefined,
  title: string | null | undefined
}



export default function Book(props: Book) {

  const booksCtx = useContext(AddToReadListContext)
  const setOpenModal = useContext(ModalControlContext)
  const setSelectedBook = useContext(SetSelectedBookContext)



  function handleViewBook() {
    setSelectedBook(props)
    setOpenModal(true)

  }

  function handleAddToReadList() {
    booksCtx?.setBooks([...booksCtx?.books, { ...props }])
  }

  const imageURI = import.meta.env.DEV ? `/src/${props.coverPhotoURL}` : images.find(({name}) => name == props.coverPhotoURL)?.url 

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      className="border-gray-400 rounded border p-2 cursor-pointer"
    >
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <img src={imageURI} alt="Book Cover Photo" className="w-[90px] object-fit rounded-md aspect-square">
        </img>

        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={1}
        >
          <Button
            onClick={handleAddToReadList}
            sx={{
              maxWidth: 'min',
              height: '40px',
              padding: "2px",
              background: '#335C6E',
              fontWeight: 600,
              color: '#FAAD00',
              zIndex: 0,
              ":hover": {
                color: "#335C6E",
                backgroundColor: "#FAAD00"
              }

            }} >Add +</Button>

          <Button
            onClick={handleViewBook}
            sx={{
              maxWidth: 'min',
              height: '40px',
              padding: "2px",
              background: '#53C2C2',
              fontWeight: 600,
              color: '#335C6E',
              zIndex: 0,
              ":hover": {
                color: "#53C2C2",
                backgroundColor: "#335C6E"
              }


            }} >View</Button>

        </Box>

      </Box>


      <Box
        display={'flex'}
        flexDirection={'column'}
      >
        <label className="font-bold text-lg group-hover:cursor-pointer text-start">{props?.title}</label>

        <span className="text-start space-x-2">
          <label className="font-normal group-hover:cursor-pointer text-gray-400 ">Author:</label>
          <label className="font-semibold group-hover:cursor-pointer text-gray-500 text-start  text-md">{props?.author}</label>
        </span>


        <span className="text-start space-x-2">
          <label className="font-normal group-hover:cursor-pointer text-gray-400 ">Reading Level:</label>
          <label className="font-semi-bold group-hover:cursor-pointer text-gray-500">{props?.readingLevel}</label>
        </span>

      </Box>

    </Box>
  )
}