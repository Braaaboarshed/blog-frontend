import { useEffect } from 'react'
import './pagination.css'
const Pagination = ({pages ,currentPage ,setCurrentPage}) => {
    const generatedPages = []
    for( let i = 1 ;i <= pages ; i++){
        generatedPages.push(i)
    }
    
    console.log(generatedPages)


    return ( 
        <div className="pagination">
            <button 
             className = {currentPage === 1 ?'disable page next' : 'page next' }
             disabled = {currentPage === 1}
            onClick={()=>setCurrentPage(prev =>prev - 1)}
            >
                Previous
            </button>
            {generatedPages.map(page => (
                <div 
               className={currentPage === page ? 'page active' : 'page'}
                 key={page}
                onClick={()=>(setCurrentPage(page))}
                disabled = {currentPage === 1}
                >
                    {page}
                </div>
                    ))} 
            <button 
            onClick={()=>setCurrentPage(prev =>prev + 1)}
            disabled = {currentPage === pages}
            className = {currentPage === pages ?'disable page next' : 'page next' }
            >
                Next</button>
        </div>
     );
}
 
export default Pagination ;
