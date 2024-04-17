
const Loader = () => {
  return (
    <section className="loader">
      <div></div>
    </section>
  )
}

export default Loader;


export const Skeleton=({width="unset",count=3}:{width?:string,count?:number})=>{

  const skeletons = Array.from({length:count},(_,i)=> 
  <div className="skeleton-shape" key={i}>

  </div>)
  return <div className="skeleton-loader" style={{width}}>
    
    {skeletons}
  </div>
}