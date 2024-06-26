import { Box, Button } from "@mui/material"
import type { Book } from "./Book"
import { AddToReadListContext } from "../App"
import { useContext } from "react"
import images from '../assets/images.json'

export default function BookReadListView(props: Book) {

    const booksCtx = useContext(AddToReadListContext)

    const imageURI = import.meta.env.DEV ? `/src/${props.coverPhotoURL}` : images.find(({ name }) => name == props.coverPhotoURL?.replace('assets/', ''))?.url


    function handleDeleteBook() {
        booksCtx?.setBooks(() => {
            return booksCtx?.books.filter(({ coverPhotoURL }) => {
                return coverPhotoURL !== props?.coverPhotoURL
            })
        })

    }

    return (
        <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'end'}
            gap={2}
            marginY={'20px'}
            maxHeight={'min'}

        >

            <img src={imageURI} alt="Book Cover Photo" className="w-[120px] object-fit self-start rounded-md aspect-square">
            </img>


            <Box
                display={'flex'}
                flexDirection={'column'}
                alignSelf={'start'}
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

            <Button
                onClick={handleDeleteBook}
                sx={{
                    maxWidth: 'min',
                    padding: "4px",
                    background: '#335C6E',
                    fontWeight: 600,
                    color: '#FAAD00',
                    zIndex: 0,
                    justifySelf: 'end',
                    alignItems: 'end'


                }} >Delete</Button>


        </Box>
    )
}