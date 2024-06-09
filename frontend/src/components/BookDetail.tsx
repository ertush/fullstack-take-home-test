import { Box } from "@mui/material"
import type { Book } from "./Book"
import images from '../assets/images.json'


export default function BookDetails(props: Book) {


  const imageURI = import.meta.env.DEV ? `/src/${props.coverPhotoURL}` : images.find(({name}) => name == props.coverPhotoURL?.replace('assets/', ''))?.url  
  // console.log({imageURI})

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={'start'}
      gap={2}
      marginY={'20px'}

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

    </Box>
  )
}