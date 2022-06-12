

export async function get({ params }){

  const res= await fetch('https://jsonplaceholder.typicode.com/photos')
  const photos = await res.json();
  
  return {
    body:{
      photos: photos.slice(0,100)
    }
  };
  } 
export async function post ({request})
{
  const data= await request.formData();

  const title=  /**@type {string} */ (data.get('title'))
  const file = /**@type {File} */ (data.get('file'))

/**@type {Record<string, string>} */
const errors= {};
const values = {title}
}
