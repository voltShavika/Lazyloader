import { useState, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';

import useProfileLoad from "./useProfileLoad";

function Card(props){
  return (
    <div ref={props.innerRef} className="col-md-3">
      <div className="card m-3">
        <img src={props.src} height={props.height} className="card-img-top" alt="Avatar" />
        <div className="card-body">
          <p className="card-text">
            {props.name}
          </p>
        </div>
      </div>
    </div>
  )
}

function App(){

  const [pageNumber, setPageNumber] = useState(1);
  const {loading, profiles, hasMore}  = useProfileLoad(pageNumber);
  
  const observer = useRef();
  const lastProfileElementRef = useCallback(node => {
    if(loading) return;
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        console.log("Visible");
        console.log("Setting Page number to " + (pageNumber+1));
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    })
    if(node) observer.current.observe(node);
    console.log(node);
  }, [pageNumber, loading, hasMore])

  var loader;
  if(loading){
    loader = [...Array(4)].map((_,i) => {
      var src = "https://cdn-icons-png.flaticon.com/512/186/186313.png"
      return <Card key={i} name="Title" src={src} height="250"/>
    })
  }
  return (
    <>
      <div className="container">
        <h3>Lazy Loader Profile</h3>
        <div className="row">
          {
              profiles.map((profile, i) => {
                var src = "https://avatars.dicebear.com/api/adventurer/" + profile.body + ".svg"
                
                if(profiles.length === i+1){
                  return <Card innerRef={lastProfileElementRef} key={i} name={profile.body} src={src}/>
                }
                else{
                  return <Card key={i} name={profile.body} src={src}/>
                }
              })
          }
          {loader}
        </div>
      </div>
      
    </>
  )
}

export default App;

