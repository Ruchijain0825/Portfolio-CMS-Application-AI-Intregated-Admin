export const LoginUser = async(data)=>
{
   
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        
        {
            method:"POST",
            headers:
        {
           "Content-Type":"application/json",
           credentails:true
        },
       
        body:JSON.stringify(data)
        }
        )
        const result = await response.json();
        if(!response.ok)
        {
            throw new Error(result.message)
        };
        return result;
}