import { Box, Button } from "@mui/material"
import type { Book } from "./Book"
import { AddBookViewModalContext, AddToReadListContext } from '../App'
import { useContext } from "react"
import images from '../assets/images.json'

export default function AddBookView(props: Book) {

    const booksCtx = useContext(AddToReadListContext)
    const setOpenModalState = useContext(AddBookViewModalContext)

    const imageURI = import.meta.env.DEV ? `/src/${props.coverPhotoURL}` : images.find(({name}) => name == props.coverPhotoURL?.replace('assets/', ''))?.url 


    function handleAddToReadList() {
        booksCtx?.setBooks([...booksCtx?.books, { ...props }])
        setOpenModalState(false)

    }


    return (
        <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'start'}
            gap={2}
            marginY={'20px'}
            width={'100%'}

        >

            <img src={imageURI} alt="Book Cover Photo" className="w-[120px] object-fit rounded-md aspect-square">
            </img>



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

            <Button onClick={handleAddToReadList} sx={{ justifySelf: 'end', backgroundColor: '#335C6E', color: "#FAAD00", padding: '2px', fontWeight: 600 }}>Add +</Button>

        </Box>
    )
}