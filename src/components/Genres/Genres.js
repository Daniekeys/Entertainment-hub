import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },

}));
const Genres = ({
 selectedGenres,  genres   , 
  setGenres,
  setSelectedGenres,
  setPage,
  type
}) => {

const classes = useStyles();
const handleAdd = (genre) => {
  setSelectedGenres([...selectedGenres, genre]);
  setGenres(genres.filter((g) => g.id !== genre.id))
  setPage(1);
}
const handleRemove = (genre) => {
setSelectedGenres(
  selectedGenres.filter((selected) => selected.id !== genre.id)
);
setGenres([...genres, genre]);
setPage(1);
}

const fetchGenres = async () => {
 const {data} =  await axios.get(`
https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

setGenres(data.genres);

}

console.log(genres);

useEffect(() => {
fetchGenres();
return () => {
 setGenres({});
};
//eslint-disable-next-line
}, [])


 return (
  <div  className={classes.root}
  style={{padding: "6px 0"}}
  >
     {selectedGenres && selectedGenres.map((genre) => {
       return (

         <Chip label={genre.name}
           style={{ margin: 2,
          }}
          className={classes.chip}
           clickable size="small" key={genre.id}
           color="primary"

           size="medium"
           variant="default"
           onDelete={() => handleRemove(genre)}
         />
       )
     })}

  {genres && genres.map((genre) => {
    return (

      <Chip label={genre.name}
      style={{margin:2,
      fontWeight:600,
      
      }}
      clickable size="medium" key={genre.id}
      onClick={() => handleAdd(genre)}
        color="primary"
      />
    )
  })}
   
  </div>
 )
}

export default Genres
