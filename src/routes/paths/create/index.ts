
export async function post ({request})
{
  const data= await request.formData();

  const title=  /**@type {string} */ (data.get('title'))
  const file = /**@type {File} */ (data.get('file'))

/**@type {Record<string, string>} */
const errors= {};
const values = {title}
}
