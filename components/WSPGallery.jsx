import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronLeft, 
  faCircleChevronRight, 
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import url from './url'

// import './wsp-gallery.css'

const WSPGallery = () => {

  const [slideNumber, setSlideNumber] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [perpage, setPerpage] = useState(5)
const [d,setD] = useState([])

useEffect(() => {
    const fetchData = async()=>{
      let data = await fetch(`${url}getImage?page=${1}&perPage=${perpage}`)
      data = await data.json()
      console.log(data);
      setD(data.data)
    
    } 
    fetchData()
    if(page == 1){
        document.getElementById("prev").style.visibility = "hidden"
    }
    },[])




  const handleOpenModal = (index) => {
    setSlideNumber(index)
    setOpenModal(true)
  }

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // Previous Image
  const prevSlide = () => {
    slideNumber === 0 
    ? setSlideNumber( d.length -1 ) 
    : setSlideNumber( slideNumber - 1 )
  }

  // Next Image  
  const nextSlide = () => {
    slideNumber + 1 === d.length 
    ? setSlideNumber(0) 
    : setSlideNumber(slideNumber + 1)
  }

const handleSearch = async(e)=>{
    let data = await fetch(`${url}search?query=${e.target.value}`)
    data = await data.json()

    setD(data.data)
    if(e.target.value == ""){
        handlePage("null",true)
    }
}

const handlePage = async(op,search=false)=>{

    if(search){
        let d = await fetch(`${url}getImage?page=${1}&perPage=${perpage}`)
        d = await d.json()
        setD(d.data)
        console.log(d);
        if(d.nextPage == null && d.page != 1){
            document.getElementById('next').style.visibility = "hidden"
        }else{
            document.getElementById('next').style.visibility = "visible"
        }
        if(d.page == 1){
            document.getElementById("prev").style.visibility = "hidden"
         
        }else{
            document.getElementById("prev").style.visibility = "visible"
        }
console.log("inside");
        return
    }
 
if(op == "next"){

    setPage(page+1)
    let d = await fetch(`${url}getImage?page=${page+1}&perPage=${perpage}`)
    d = await d.json()
    setD(d.data)
    // console.log(d);
    if(d.nextPage == null){
        document.getElementById('next').style.visibility = "hidden"
    }else{
        document.getElementById('next').style.visibility = "visible"
    }
    if(d.page == 1){
        document.getElementById("prev").style.visibility = "hidden"
     
    }else{
        document.getElementById("prev").style.visibility = "visible"
    }
}
else if(op == "prev"){
    setPage(page-1)
    let d = await fetch(`${url}getImage?page=${page-1}&perPage=${perpage}`)
    d = await d.json()
    setD(d.data)
   console.log(d);
    if(d.nextPage == null){
        document.getElementById('next').style.visibility = "hidden"
    }else{
        document.getElementById('next').style.visibility = "visible"
    } 
    if(d.page == 1){
        document.getElementById("prev").style.visibility = "hidden"
     
    }else{
        document.getElementById("prev").style.visibility = "visible"
    }

}

}

  return (
    <div>

      {openModal && 
        <div className='sliderWrap'>
          <FontAwesomeIcon icon={faCircleXmark} className='btnClose' onClick={handleCloseModal}  />
          <FontAwesomeIcon icon={faCircleChevronLeft} className='btnPrev' onClick={prevSlide} />
          <FontAwesomeIcon icon={faCircleChevronRight} className='btnNext' onClick={nextSlide} />
          <div className='fullScreenImage'>
            <img src={d[slideNumber].imgUrl} alt='' />
          
          </div>
          <p className='caption'>Caption - {d[slideNumber].description}</p>
        </div>
      }
        <div class="wrapper">
	<div class="search_box">
    <input type="text" class="input_search" placeholder="Search.." onChange={(e)=>{
        handleSearch(e)
      }}/>

	</div>
</div>


      <div className='galleryWrap'>
      {d.length==0 && <div>
        <p>
            No Image.....
        </p>
        </div>} 
        {

         d && d.map((slide, index) => {
            return(
              <div 
                className='single' 
                key={index}
                onClick={ () => handleOpenModal(index) }
              >
                <img src={slide.imgUrl} alt='' />
              </div>
            )
          })
        }
      </div>
<div className="pagination">
<button id='prev' className='but' onClick={()=>{handlePage("prev")}} >Prev</button>
    <button id='next' className='but' onClick={()=>{handlePage("next")}} >Next</button>


</div>
    </div>
  )
}

export default WSPGallery