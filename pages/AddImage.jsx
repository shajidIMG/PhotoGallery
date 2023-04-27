import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Link from "next/link";


function AddImage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ imgUrl: "", description:""});
  const changeHandler = (e) => {
    const { name, value } = e.target;
    //console.log(name, value);
    setFormData((preVal) => {
      return { ...preVal, [name]: value };
    });
    // console.log(formData);
  }
  const handleSubmit = async()=>{
    if(formData.imgUrl == ""){
      // console.log("please provide image url");
      toast.error('please provide image url!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return
    }
    if(formData.description == ""){
      // console.log("please provide image description");
      toast.error('please provide image description!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return
    }

    let data = await fetch(`/api/addImage`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    data = await data.json()
    console.log(data);

    if(data.success){
      toast.success(data.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        router.push('/');
    }else{
      toast.error(data.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

  }
  
  return (
    <>
    <ToastContainer
position="top-left"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
<div className="add" style={{margin:"20px"}}>
 {/* <Link to='/addImage'> <button>Add Image</button></Link> */}
 <Link style={{width: "80px"}} className="link" href="/">Back</Link>
</div>
    <div className="login-box">
    
 
    <h2>Add Image</h2>
    <form>
      <div className="user-box">
        <input type="text" name="imgUrl" required="" value={formData.imgUrl} onChange={changeHandler}/>
        <label>Image Url</label>
      </div>
      <div className="user-box">
        <input type="text" name="description" required="" value={formData.description} onChange={changeHandler} placeholder="Keywords"/>
        <label>Description</label>
      </div>
      <a onClick={handleSubmit}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </a>
    </form>
  </div>
  
  </>
  )
}

export default AddImage