import axios from "axios"
//import {CircularProgress} from '@mui/material'
import {useEffect,useState} from 'react'

function Modules (){
const [modules,setModules] = useState([])
const [loading,setLoading] = useState(false) 

useEffect(()=>{
    var array = []
    setLoading(true)
    const URL = "http://localhost:8000/pdfsummary"
    axios.get(URL)
    .then((res) =>{
        console.log(res)
        return res.data.map(
            
            (mod) => {
                for (const i = 0; i < modules.length;i++){
                    if (mod == modules[i]){
                        return;
                    }
                }
                array.push(mod)
            }
        )
    }
    )
    .finally(()=>{setLoading(false)
        setModules(array)
        console.log(modules)
    })
},[])

return (

    <div>
        {loading?
        <p>Loading</p>:
        (
            modules.length > 0? (
                modules.map((module)=>(
                    <div key={module._id}>
                        <span>{module.module}</span>
                    </div>
                ))
            ):
            <p>No Modules</p>
        )}
    </div>
)
                }
export default Modules