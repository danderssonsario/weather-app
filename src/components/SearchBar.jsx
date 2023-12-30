import { useState, useEffect } from "react"
import { Input, Button } from '@nextui-org/react'
import { data } from "autoprefixer"

function SearchBar() {
  const [input, setInput] = useState('')
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`)
      const data = await response.json()
      
    } catch (error) {
      console.log(error)
    }
  }

    useEffect(() => {
      async function fetchData () {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${'stockholm'}&appid=${import.meta.env.VITE_API_KEY}`)
      const data = await response.json()

      setLongitude(data[0].lon)
      setLatitude(data[0].lat)
      }
      
      fetchData()
    }, [])

  const handleChange = (e) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          value={input}
          placeholder='Location'
          onChange={handleChange}
        />
        <Button type="submit" color='secondary'>Button</Button>
      </form>
      <div></div>
    </div>
  )
}

export default SearchBar