import { useState } from "react"

const useForm =(InitialForm) =>{
    //logica de formulario y estados
    const [formState, setFormState] = useState(InitialForm)

    const handleChange = (event) =>{
        const field_name = event.target.name
        const field_value = event.target.value
        setFormState((prevFormState)=>{ 
            return {...prevFormState, [field_name]: field_value} 
        })
    }
    return {formState, handleChange, setFormState}
}

export default useForm