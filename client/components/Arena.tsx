import { useLocation } from 'react-router-dom';
export default function Arena(){
  const location = useLocation();
  const results = location.state.results;

  // Now you can use 'results' in your Arena component
  console.log("from arena component",results);


  return(
   <div className = "arenaContainer">
   {results.map((data)=>{
   
   return(
   <div style = {{backgroundColor:data.icon_background_color }}key = {data.place_id}className = "arenaFighter">
    {data.name}
    </div>)
    })
    }
    
   </div>
  )
}