import { Button, Box, Typography } from "@mui/material"
import { useContext } from "react"
import { FavouriteBooksContext } from "../App"


export default function FavouriteBooks({ bookCount }: { bookCount: number }) {

    const setOpenFavouriteBooksModal = useContext(FavouriteBooksContext)


    function handleOpenFavouriteBooksList() {
        setOpenFavouriteBooksModal(true)
    }

    return (
        <Button onClick={handleOpenFavouriteBooksList} size={'medium'} sx={{
            position: 'relative', backgroundColor: '#335c6e', 
            borderRadius: '4px',
            color: '#FAAD00',
            ":hover": {
                backgroundColor: '#335c6e',
            }


        }}>
            <Box 
            display={'flex'}
            flexDirection={'row'}
            gap={1}
            paddingInline={2}
            textAlign={'center'}
            >

            <Typography color={'#FAAD00'} fontWeight={600} component="h2">Favourites</Typography>

             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>

            </Box>
          
            {
                bookCount > 0 &&
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        items: 'center',
                        position: 'absolute',
                        top: -4,
                        right: 5,
                        backgroundColor: 'orangered',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        zIndex: 1,
                        padding: '1px'
                    }}
                >
                    <Typography color={'white'} fontWeight={600} component="h1">{bookCount}</Typography>

                </Box>
            }
        </Button>

    )
}