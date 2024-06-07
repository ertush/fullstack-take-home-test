import { Box } from "@mui/material"

import type { Book } from "./Book"

export default function BookSearchItem(props: Book) {


    return (
        <Box
        display={'flex'}
        flexDirection={'row'}
        gap={1}
        width={'100%'}
        className="hover:bg-slate-200 p-2 hover:cursor-pointer"
        >
            <img src={`/src/${props.coverPhotoURL}`} alt="" className="w-[85px] aspect-square objec-fit" />
            <Box
            display={'grid'}
            gridTemplateColumns={'1fr'}
            gap={1}
            width={'100%'}
            >
             <label className="font-bold text-lg text-start">{props?.title}</label>

             {/* <label className="font-semibold text-gray-500 text-start text-md">{props?.author}</label> */}

                  <span className="text-start space-x-2">
              <label className="font-normal text-gray-400">Author:</label>
              <label className="font-semibold text-gray-500 text-start text-md">{props?.author}</label>
              </span>

            
            <span className="text-start space-x-2">
              <label className="font-normal text-gray-400">Reading Level:</label>
              <label className="font-semi-bold">{props?.readingLevel}</label>
            </span>

            </Box>
        </Box>
    )
}