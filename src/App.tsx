import { useState } from 'react';
import './App.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import ScrollTop from './components/ScrollTop';
import SideNav from './components/SideNav';
import TopNavbar from './components/TopNavbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import TvShows from './pages/TvShows';
import TvShowsDetails from './pages/TvShowsDetails';
import ScrollButton from './components/ScrollButton';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='font-fontNunito w-full bg-[#F4F4F4] dark:bg-[#1F2933] overflow-auto transition-colors duration-100 antialiased'>
        <TopNavbar setIsOpen={setIsOpen}/>
        <SideNav isOpen={isOpen} setIsOpen={setIsOpen}/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/movie/:id' element={<MovieDetail />}/>
          <Route path='/tv-shows' element={<TvShows />}/>
          <Route path='/tv-show/:id' element={<TvShowsDetails />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
        <ScrollTop/>
        <ScrollButton/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
