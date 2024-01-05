import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'

function SearchBar() {
  const [input, setInput] = useState('')
  const [locationData, setLocationData] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const [latitude, longitude] = await fetchCoordinates()

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`
      )
      const data = await response.json()
      setLocationData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCoordinates = async () => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${import.meta.env.VITE_API_KEY}`)
    const data = await response.json()
    return [data[0].lat, data[0].lon]
  }

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
        <Button
          type='submit'
          color='secondary'
        >
          Button
        </Button>
      </form>
      <div>{locationData.main?.temp || 'temp'}</div>
    </div>
  )
}

export default SearchBar
