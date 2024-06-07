import { Box } from "@mui/material"

export type Book = {
    author: string,
    coverPhotoURL: string,
    readingLevel: string,
    title: string
}



export default function Book(props: Book) {
    
  

    return (
        <Box 
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        className="border-gray-400 rounded border p-2 cursor-pointer hover:bg-[#5ACCCC] hover:border-[#5ACCCC] group"
        >
            <img src={`/src/${props.coverPhotoURL}`}  alt="Book Cover Photo" className="w-[90px] object-fit aspect-square">
            </img>

            <Box
            display={'flex'}
            flexDirection={'column'}
            >
              <label className="font-bold text-lg text-start group-hover:cursor-pointer">{props?.title}</label>

              <span className="text-start space-x-2">
              <label className="font-normal text-gray-400 group-hover:text-gray-100">Author:</label>
              <label className="font-semibold text-gray-500 text-start group-hover:text-gray-100 text-md">{props?.author}</label>
              </span>

            
            <span className="text-start space-x-2">
              {/* <label>{`../${props.coverPhotoURL}`}</label> */}
              <label className="font-normal text-gray-400 group-hover:text-gray-100">Reading Level:</label>
              <label className="font-semi-bold group-hover:text-white">{props?.readingLevel}</label>
            </span>

            </Box>

        </Box>
    )
}