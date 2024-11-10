import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export function AnimessNewPage() {
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('handling submit')
    const params = new FormData(event.target)
    axios.post("http://localhost:3000/items.json", params).then(response => {
      console.log(response.data)
      // window.location.href = "/"
      navigate('/');
      
    })
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <br />
        <div>
          <label htmlFor="image_url">image_url:</label>
          <textarea id="image_url" name="image_url"></textarea>
        </div>
        <br />
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" />
        </div>
        <br />
        <div>
          <label htmlFor="catergory">Category:</label>
          <input type="text" id="catergory" name="catergory" />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}