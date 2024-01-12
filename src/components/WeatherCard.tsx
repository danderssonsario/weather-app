import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import SearchForm from './SearchForm'
import { useState } from 'react'

function WeatherCard() {

const [submitData, setSubmitData] = useState<{ name: string , main: { temp: number } } >({ name: '', main: { temp: 0 }})
const { name, main } = submitData

const handleSubmitData = (data: { name: string, main: { temp: number }}) => {
  console.log(data)
  setSubmitData(data)
}

  return (
    <Card className='max-w-xl h-auto bg-sky-400 shadow-lg bg-opacity-80'>
      <CardHeader className='flex justify-center'>
        <SearchForm onSubmitData={handleSubmitData}></SearchForm>
      </CardHeader>

      <CardBody>
        <p className='text-white'>{name}</p>
        {main && <p className='text-white'>{main.temp}&deg;C</p>}
      </CardBody>
      <CardFooter>
        {/* You can add additional content in the CardFooter if needed */}
      </CardFooter>
    </Card>
  )
}

export default WeatherCard
