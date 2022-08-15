import MovieSearchbar from '../components/MovieSearchbar'
import SliderImage from '../components/Home/SliderImage/SliderImage'
import NowPlaying from '../components/Home/NowPlaying'

const Home = () => {
 
  return (
    <div className='py-3 md:ml-[220px] lg:ml-[240px] h-full min-h-screen'>
        <div className='hidden md:block'>
            <MovieSearchbar />
        </div>
        {/* Slider Image*/}
        <SliderImage/>
        {/* Now playing */}
        <NowPlaying />
    </div>
  )
}

export default Home