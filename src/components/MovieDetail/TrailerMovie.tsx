import YouTube from 'react-youtube'
import { TrailerProps } from '../../types/types';

const TrailerMovie = ({ videoResults }: TrailerProps) => {

  const trailer = videoResults?.find((video: { type: string }) =>  video.type === 'Trailer');

  return (
    <div className='mt-7 w-full h-full px-6'>
        <h1 className='text-2xl text-[#343333] dark:text-[#F5F7FA] mb-5'>Trailer</h1>
        <div className='w-full h-full '>
            <YouTube videoId={trailer?.key} className='w-full h-full rounded-xl overflow-hidden'/>
        </div>
    </div>
  )
}

export default TrailerMovie