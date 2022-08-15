import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import MovieSearchbar from '../components/MovieSearchbar'
import ScrollTop from '../components/ScrollTop'
import Loader from '../components/MovieDetail/TopInfoMovie/Loader'
import TopInfoMovie from '../components/MovieDetail/TopInfoMovie/TopInfoMovie'
import CastsCrews from '../components/MovieDetail/CastsCrews/CastCrews'
import MovieInformation from '../components/MovieDetail/MovieInformation'
import TrailerMovie from '../components/MovieDetail/TrailerMovie'
import Recommendations from '../components/MovieDetail/Recommendations'

const fetchMovieDetails = ({ queryKey }: any) => {
    const id = queryKey[1];
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&append_to_response=videos`)
}
 
const fetchCast = ({ queryKey }: any) => {
    const id = queryKey[1];
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`)
}

type ErrorType = {
    message: string
}

const MovieDetail = () => {

    const { id } = useParams();
    const {isLoading: isLoadingMovieDetails, isFetching: isFetchingMovieDetails, data, isError, error} = useQuery(['movie-details', id], fetchMovieDetails);
    const {isLoading: isLoadingCast, data: dataCast, isFetching: isFetchingCast, isError: isErrorCast} = useQuery(['cast-crew', id], fetchCast);
    
    const theError = error as ErrorType;

    if(isError && isErrorCast) {
        return (
            <div className='md:ml-[220px] lg:ml-[240px] w-auto h-screen relative flex items-center justify-center p-2'>   
                <h1 className='text-lg font-light dark:text-[#BCCCDC] mb-5'>{theError.message}</h1>
            </div>
        ) 
    }

  return (
    <div className='md:ml-[220px] lg:ml-[240px] w-auto h-full relative'>     
        {/* <ScrollTop/> */}
        <div className='hidden md:block absolute top-0 right-0 z-20 w-full max-w-[370px] my-2'>
            <MovieSearchbar />
        </div> 

        {isLoadingMovieDetails ?  <Loader /> : <TopInfoMovie data={data?.data}/> }
        
        <div className=' mt-9 gap-5 mx-6 flex flex-col-reverse lg:grid lg:grid-cols-myGrid'>
            <CastsCrews cast={dataCast?.data?.cast} crew={dataCast?.data?.crew} isLoadingCast={isLoadingCast}/>
            <MovieInformation data={data?.data} isLoadingMovieDetails={isLoadingMovieDetails}/>
        </div>

        <TrailerMovie videoResults={data?.data?.videos?.results} />
        <Recommendations id={id}/>
    </div>
  )
}

export default MovieDetail