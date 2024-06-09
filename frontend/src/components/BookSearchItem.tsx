import { Box } from "@mui/material"
import { useContext } from "react"
import type { Book } from "./Book"
import { SearchSelectContext, AddBookViewModalContext, SearchInputContext } from '../App'
import images from '../assets/images.json'

export default function BookSearchItem(props: Book) {

  const setSearchSelectedBook = useContext(SearchSelectContext)
  const openAddBookViewModal = useContext(AddBookViewModalContext)
  const setIsSearchInput = useContext(SearchInputContext)

  const imageURI = import.meta.env.DEV ? `/src/${props.coverPhotoURL}` : images.find(({name}) => name == props.coverPhotoURL?.replace('assets/', ''))?.url 


  function handleSelectFromSearch() {
    setSearchSelectedBook(props)
    openAddBookViewModal(true)
    setIsSearchInput(false)

  }

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      gap={1}
      width={'100%'}
      className="hover:bg-[#FAAD00] p-2 group"
      onClick={handleSelectFromSearch}
    >
      <img src={imageURI} alt="" className="w-[85px] aspect-square cursor-pointer rounded objec-fit" />
      <Box
        display={'grid'}
        gridTemplateColumns={'1fr'}
        gap={1}
        width={'100%'}
      >
        <label className="font-bold text-lg text-start hover:cursor-pointer">{props?.title}</label>


        <span className="text-start space-x-2">
          <label className="font-normal text-gray-400 hover:cursor-pointer group-hover:text-gray-500">Author:</label>
          <label className="font-semibold text-gray-500 text-start text-md hover:cursor-pointer">{props?.author}</label>
        </span>


        <span className="text-start space-x-2">
          <label className="font-normal text-gray-400 hover:cursor-pointer group-hover:text-gray-500">Reading Level:</label>
          <label className="font-semi-bold text-gray-500 font-semibold group-hover:cursor-pointer">{props?.readingLevel}</label>
        </span>

      </Box>
    </Box>
  )
}