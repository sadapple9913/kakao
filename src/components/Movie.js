import React from 'react'
import PropTypes from 'prop-types';
import '../styles/Movie.css';
import { Link } from 'react-router-dom';

function Movie({genres,id,poster,summary,title,year}){
return (
  <div className='movie'>
    <Link to={'/detail'} state={{genres,id,poster,summary,title,year}}>
    <img src={poster} alt={title} title={title}/>
    <div className='movie_data'>
    <h3 className='movie_title' style={{backgroundColor:'#eee'}}>{title}</h3>  
    <h4 className='movie_year'>{year}</h4>
    <ul className='movie_genres'>
      {genres.map((genre,index) =>{
        return (
      <li className='movie_genre' key={index}>{genre}</li>
        )
    })}
    </ul>
    <p className='movie_summary'>{summary.slice(0,180)} ...</p>
    </div>
    </Link>
  </div>
  )
}

//npm install prop-types //prop-types을 깔아야 사용가능
Movie.propTypes = {
  id : PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  poster : PropTypes.string.isRequired,
  summary : PropTypes.string.isRequired,
  title : PropTypes.string.isRequired,
  genres : PropTypes.arrayOf(PropTypes.string).isRequired, //arrayOF()은 문자열을 원소로 갖는 배열

}


export default Movie