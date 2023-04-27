import React, {useState, useEffect} from "react";

import WSPGallery from '../components/WSPGallery';
import Link from "next/link";


export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [model, setModel] = useState(false)
  const [tempImgSrc, setTempImgSrc] = useState(null)
  const [query, setQuery] = useState("")
const [data, setData] = useState([])

const getImage = (e)=>{
  setTempImgSrc(e)
  setModel(true)
}

useEffect(() => {
const fetchData = async()=>{
  let data = await fetch(`/api/getImage`)
  data = await data.json()
  // console.log(data);
  setData(data)

} 
fetchData()
},[])
  return (

<>
<div className="add" style={{margin:"20px"}}>
 {/* <Link to='/addImage'> <button>Add Image</button></Link> */}
 <Link className="link" href="/AddImage">Add Image</Link>
</div>
<WSPGallery
      
      />
    </>
    
  )
}
