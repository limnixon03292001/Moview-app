import { useRef, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { BiSearchAlt2 } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import { MovieType } from '../types/types'
import GlobalLoader from './GlobalLoader'
import useClickOutside from '../hooks/useClickOutside'
import { DebounceInput } from 'react-debounce-input'

const search = (searchData: string) => {
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${searchData}`);
}

const MovieSearchbar = () => {

    const ref = useRef<HTMLDivElement>(null);
    const [searchData, setSearchData] = useState<string>('');
    const { data, isFetching }  = useQuery(['search', searchData], () => search(searchData), 
    {
        enabled: Boolean(searchData)
    });


    useClickOutside(ref, setSearchData);

  return (
    <div className='md:my-3 md:mx-7'>
      <div className='max-w-[410px] h-[47px] relative'>

        <div className='h-full w-full relative'>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          className= 'drop-shadow-md bg-white dark:bg-[#323F4B] px-4 pr-7 py-2 rounded-lg w-full h-full dark:text-[#E4E7EB] outline-none focus:ring focus:ring-[#E4E7EB]'
          placeholder='Search movie...'
          onChange={e => setSearchData(e.target.value)} />
         <div className='text-gray-500 dark:text-[#E4E7EB] mx-2 flex items-center justify-center absolute top-0 right-0 bottom-0 '>{searchData === '' ? <BiSearchAlt2 size={24}/> :  <IoMdClose size={27} className='cursor-pointer p-1 rounded-full drop-shadow-md bg-[#F4F4F4] dark:bg-[#1F2933]' onClick={() => setSearchData(prevData => prevData = '')}/>} </div> 
        </div>

          <div className='absolute max-h-[390px] overflow-y-auto overflow-x-hidden w-full z-30 bg-[#F4F4F4] dark:bg-[#323F4B] drop-shadow-md rounded-md mt-1' ref={ref}>

            {isFetching ? 

              <div className='w-full h-full gap-3 flex items-center md:pl-3 py-2'>
                <GlobalLoader /> 
                <p className='text-[#343333] dark:text-[#F5F7FA] text-xs md:text-sm'>Fetching Movie Information...</p>
              </div>

            :  
          
              data?.data?.results.map((movie: MovieType, id: number) => (
                <Link to={`/movie/${movie?.id}`} key={id} className='px-3 my-3 w-full h-max flex gap-3 items-center' onClick={() => setSearchData(prevData => prevData = '')}>
                  <div className='w-[36px] h-[36px] lg:w-[46px] lg:h-[46px] rounded-full flex-grow-0 flex-shrink-0 overflow-hidden'>
                    <img src={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`} alt="poster_img" className='  w-full h-full object-cover object-center bg-white' />
                  </div>
                  <div>
                    <p className='text-[14px] md:text-sm text-[#343333] dark:text-[#F5F7FA]'>{movie?.title}</p>
                    <p className='text-[11px] md:text-xs text-[#4F4D4D] dark:text-[#CBD2D9]'>{movie?.original_title}</p>
                  </div>
                </Link>
              )) 
            }

          </div>
      </div>
    </div>
  )
}

export default MovieSearchbar