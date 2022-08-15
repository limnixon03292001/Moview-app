import { useCallback, useEffect } from 'react'

const useClickOutside = (ref: React.RefObject<HTMLDivElement>, setSearchData: React.Dispatch<React.SetStateAction<string>>) => {

     const click = (event: MouseEvent) => {
        const descendant = event.target as HTMLDivElement
        if(ref.current && !ref.current.contains(descendant)){
             setSearchData('');
        }
      }

    useEffect(() =>{
        
       document.addEventListener('mousedown', click);

       return () => {
           document.removeEventListener('mousedown', click);
       }
   },[ref,setSearchData]);
}

export default useClickOutside