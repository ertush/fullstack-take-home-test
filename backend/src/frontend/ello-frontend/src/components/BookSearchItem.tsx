import { Box } from "@mui/material"
import { useContext } from "react"
import type { Book } from "./Book"
import {SearchSelectContext, AddBookViewModalContext, SearchInputContext} from '../App'

export default function BookSearchItem(props: Book) {

    const setSearchSelectedBook = useContext(SearchSelectContext)
    const openAddBookViewModal = useContext(AddBookViewModalContext)
    const setIsSearchInput = useContext(SearchInputContext)
    

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
        className="hover:bg-[#FFE6DC] p-2 group"
        onClick={handleSelectFromSearch}
        >
            <img src={`/src/${props.coverPhotoURL}`} alt="" className="w-[85px] aspect-square  rounded objec-fit" />
            <Box
            display={'grid'}
            gridTemplateColumns={'1fr'}
            gap={1}
            width={'100%'}
            >
             <label className="font-bold text-lg text-start group-hover:cursor-pointer">{props?.title}</label>

             {/* <label className="font-semibold text-gray-500 text-start text-md">{props?.author}</label> */}

            <span className="text-start space-x-2">
              <label className="font-normal text-gray-400 group-hover:cursor-pointer">Author:</label>
              <label className="font-semibold text-gray-500 text-start text-md group-hover:cursor-pointer">{props?.author}</label>
              </span>

            
            <span className="text-start space-x-2">
              <label className="font-normal text-gray-400 group-hover:cursor-pointer">Reading Level:</label>
              <label className="font-semi-bold group-hover:cursor-pointer">{props?.readingLevel}</label>
            </span>

            </Box>
        </Box>
    )
}