import { useState, ChangeEvent, FormEvent } from 'react'
import { Input, Button } from '@nextui-org/react'

interface LocationData {
  name: string,
  main: {
    temp: number
  }
}

interface Props {
  onSubmitData: (data: LocationData) => void
}

const hej = async () => {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=stockholm&appid=${import.meta.env.VITE_API_KEY}`)
  const data: { lat: number; lon: number }[] = await response.json()
  console.log(data)
}

function SearchForm({ onSubmitData }: Props) {
  const [input, setInput] = useState<string>('')

  hej()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const [latitude, longitude] = await fetchCoordinates()

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
      )
      const data: LocationData = await response.json()

      onSubmitData(data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchData = async (latitude:string, longitude:string) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
      )
      const data: LocationData = await response.json()
  }

  const fetchCoordinates = async (): Promise<[number, number]> => {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${import.meta.env.VITE_API_KEY}`)
      const data: { lat: number; lon: number }[] = await response.json()
      return [data[0].lat, data[0].lon]
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <>
<form className='flex flex-row space-x-2' onSubmit={handleSubmit}>
  <Input
    size='sm'
    type='text'
    value={input}
    placeholder='Location'
    onChange={handleChange}
    className='bg-white rounded-md shadow-md focus:outline-none focus:ring focus:border-sky-500'
  />
  <Button
    size='lg'
    type='submit'
    color='secondary'
    className='bg-sky-500 text-white p-2 rounded-md shadow-md hover:bg-sky-600 focus:outline-none focus:ring focus:border-sky-700'
  >
    Search
  </Button>
</form>
    </>
  )
}

export default SearchForm
