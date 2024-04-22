import axios from "axios";
import { useEffect } from "react"


export default function Auth() {

   
    useEffect(()=>{
      
    
            try {
              let res = await axios.get("https://api.magicslide.uz/api/v1/auth/authorization?");
              if (res.status === 200) {
               console.log(res.status);
                localStorage.setItem("token", res.data.token);
              }
            } catch (error) {
              alert("email: eve.holt@reqres.in");
             
            } 
            // finally {
            //   setValues({ email: "", password: "" });
            // }
          


    }[])



  return (
    <div>
      
    </div>
  )
}
