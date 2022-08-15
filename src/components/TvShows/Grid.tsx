import React from 'react'
import { Link } from 'react-router-dom'
import { TvShowsType } from '../../types/types'
import GlobalLoader from '../GlobalLoader'


const Grid = ({ isLoading, fetchNextPage, data, isFetching, filterName }: any) => {
  return (
    <div>
        {isLoading ? 
            <div className='gap-3 max-w-max flex flex-wrap text-center px-6 items-center justify-center'>
                <GlobalLoader /> 
                <p className='text-[#343333] dark:text-[#F5F7FA] text-sm'>Fetching {filterName}...</p>
            </div>
        :
            <>
                <div className='grid grid-cols-myGridFluid lg:grid-cols-myGridFluidlg gap-4 mx-6'>
                    {data?.pages.map((group: { data: { results: [] }}, id: number) => (
                        <React.Fragment key={id}>
                            {group?.data?.results.map((show: TvShowsType, id: number) => (
                                    <Link to={`/tv-show/${show?.id}`} key={id} className='space-y-4 mx-auto md:mx-0 drop-shadow-md'>
                                    {show?.poster_path ? 
                                        <img src={`https://image.tmdb.org/t/p/w200${show?.poster_path}`} alt="poster" className='rounded-xl w-full max-w-[220px] h-[190px] lg:h-[240px] drop-shadow-md object-cover object-fit bg-gray-200 dark:bg-[#323F4B]' />
                                    :
                                        <div className='max-w-[220px] h-[190px] lg:h-[240px] object-cover object-center bg-gray-200 dark:bg-[#323F4B] rounded-xl overflow-hidden font-light flex items-center'>
                                            <h1 className='w-full text-center text-gray-400 dark:text-[#BCCCDC]'>Photo not available</h1>
                                        </div> }

                                        <h1 className='text-md text-[#343333] dark:text-[#F5F7FA] break-words'>{show?.name}</h1>
                                </Link>
                            ))}
                        </React.Fragment>   
                    ))}
                </div>
                    {isFetching ?  
                        <div className='gap-3 flex flex-wrap text-center px-6 mt-2 items-center justify-center'>
                        <GlobalLoader /> 
                        <p className='text-[#343333] dark:text-[#F5F7FA] text-sm'>Fetching more shows...</p>
                        </div> 
                    :
                        <button onClick={() => fetchNextPage()} className='w-full h-full max-w-[180px] bg-[#343333] dark:bg-[#323F4B] active:bg-[#343333]/80 text-gray-200 dark:text-[#F5F7FA] focus:ring focus:ring-violet-300 rounded-lg block m-auto py-2 my-[17px]'>Load more.</button>
                    }
            </>
        }
    </div>
  )
}

export default Grid