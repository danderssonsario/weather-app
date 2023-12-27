import { useState } from "react"

function SearchBar() {
  const [input, setInput] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // TODO: fetch api with input
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={input}
          placeholder='Location'
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export default SearchBar