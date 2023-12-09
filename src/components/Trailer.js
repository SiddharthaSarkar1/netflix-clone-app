import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import YouTube from 'react-youtube';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Trailer = ({location, movieId}) => {

    const [trailerView, setTrailerView] = useState([]);

    const showTrailer = async () => {
        await fetch(`https://api.themoviedb.org/3/movie/${movieId ? movieId : location?.state?.movie?.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(res => res.json())
        .then(json => setTrailerView(json?.results))
    }

    useEffect(() => {
        showTrailer();
    }, [trailerView])
    

    let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

    return (
        <div>
          <Button variant="contained" sx={{color: "black", bgcolor: "white"}} onClick={openModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Play Trailer</Button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>

            { trailerView && 
              <YouTube videoId={trailerView[0]?.key} />
            }
            
          </Modal>
        </div>
      );

}

export default Trailer;
