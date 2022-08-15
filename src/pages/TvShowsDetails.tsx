import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import TvShowsSearchbar from '../components/TvShowsSearchbar'
import Loader from '../components/MovieDetail/TopInfoMovie/Loader'
import TopInfoTvShow from '../components/TvShowsDetails/TopInfoTvShow'
import Season from '../components/TvShowsDetails/Season'
import CastsCrews from '../components/MovieDetail/CastsCrews/CastCrews'
import MovieInformation from '../components/MovieDetail/MovieInformation'
import TrailerMovie from '../components/MovieDetail/TrailerMovie'
import Recommendations from '../components/TvShowsDetails/Recommendations'

const fetchTvShowDetails = ({ queryKey }: any) => {
    const id = queryKey[1];
    return axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&append_to_response=videos`)
}

const fetchCasts = ({ queryKey }: any) => {
  const id = queryKey[1];
  return axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`)
}

const TvShowsDetails = () => {

    const {id } = useParams();

    const {data, isLoading : isLoadingMovieDetails,} = useQuery(['tvShows-details', id], fetchTvShowDetails);
    const {data: dataCastCrew, isLoading : isLoadingCast,} = useQuery(['cast-crews', id], fetchCasts);
    const [tvShowTitle, setTvShowTitle] = useState<string>('');

  return (
    <div className='md:ml-[220px] lg:ml-[240px] w-auto h-full relative mb-9'>
        <div className='hidden md:block absolute top-0 right-0 z-20 w-full max-w-[370px] my-2'>
            <TvShowsSearchbar />
        </div> 
        
        {isLoadingMovieDetails ?  <Loader /> : <TopInfoTvShow data={data?.data} setTvShowTitle={setTvShowTitle}/>}
        
        <Season seasons={data?.data?.seasons} tvShowTitle={tvShowTitle} isLoadingMovieDetails={isLoadingMovieDetails}/>

        <div className=' mt-9 gap-5 mx-6 flex flex-col-reverse lg:grid lg:grid-cols-myGrid'>
            <CastsCrews cast={dataCastCrew?.data.cast} crew={dataCastCrew?.data?.crew} isLoadingCast={isLoadingCast}/>
            <MovieInformation data={data?.data} isLoadingMovieDetails={isLoadingMovieDetails}/>
        </div>

        <TrailerMovie videoResults={data?.data?.videos?.results} />

        <Recommendations id={id}/>
          
    </div>
  )
}

export default TvShowsDetails