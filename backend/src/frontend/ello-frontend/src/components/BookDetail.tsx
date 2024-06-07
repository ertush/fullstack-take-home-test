import { Box } from "@mui/material"
import type { Book } from "./Book"


export default function BookDetails(props: Book) {
    
  

    return (
        <Box 
        display={'flex'}
        flexDirection={'row'}
        alignItems={'start'}
        gap={2}
        marginY={'20px'}
    
        >
            {/* <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            width={'100%'}
            > */}
               <img src={`/src/${props?.coverPhotoURL}`}  alt="Book Cover Photo" className="w-[120px] object-fit rounded-md aspect-square">
               </img>

               {/* <Button 
               sx={{
                maxWidth:'min',
                height: '40px',
                padding:"2px",
                background:'#335C6E',
                fontWeight:600,
                color: '#FAAD00',
                zIndex: 0

               }} >Add +</Button> */}

            {/* </Box> */}
           

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
              {/* <label>{`../${props.coverPhotoURL}`}</label> */}
              <label className="font-normal group-hover:cursor-pointer text-gray-400 ">Reading Level:</label>
              <label className="font-semi-bold group-hover:cursor-pointer text-gray-500">{props?.readingLevel}</label>
            </span>

            </Box>

        </Box>
    )
}