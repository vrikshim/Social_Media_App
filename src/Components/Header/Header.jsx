import React, { useState } from 'react'
import "./Header.css"
import {Link} from "react-router-dom"
import {
    Home,
    HomeOutlined,
    Add,
    AddOutlined,
    SearchOutlined,
    Search,
    AccountCircle,
    AccountCircleOutlined,
} from "@mui/icons-material"
const Header=()=>{
   const [tab,setTab]=useState("/");
   console.log(tab)
    return (
        <div className='Header'> 
      
        <Link to="/" onClick={()=>setTab(window.location.pathname)}>
         

           {
            tab==="/"?<Home style={{color:"black"}} />:<HomeOutlined />
           }
        </Link>

        <Link to="newpost " onClick={()=>setTab("/newpost")}>
         
           {
            tab==="/newpost"?<Add style={{color:"black"}} />:<AddOutlined />
           }
        </Link>

        <Link to="/search" onClick={()=>setTab("/search")}>
      
           {
            tab==="/search"?<Search style={{color:"black"}} />:<SearchOutlined />
           }
        </Link>

        <Link to="/account" onClick={()=>setTab("/account")}>
      
           {
            tab==="/account"?<AccountCircle style={{color:"black"}} />:<AccountCircleOutlined />
           }
        </Link>
        </div>
    )
}
// cmon cmon turn the radio on its friday night and it won't be long till i hit the dance floor hit the dan
export default Header