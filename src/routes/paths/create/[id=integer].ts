/* @type{import (./[id]).RequestHandler} */
export async function get({ params }){

const res= await fetch('https://jsonplaceholder.typicode.com/photos')
const photo = await res.json();

return {
  body:{
    photo
  }
};
} 
