import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import SearchForm from './SearchForm'
import { useState } from 'react'

function WeatherCard() {

  const [submitData, setSubmitData] = useState<{ main: { temp: number } } >({ main: { temp: 0 }})

const handleSubmitData = (data: { main: { temp: number }}) => {
  console.log(data)
  setSubmitData(data)
}

  return (
    <Card className='max-w-xl h-auto'>
      <CardHeader className='flex justify-center'>
        <SearchForm onSubmitData={handleSubmitData}></SearchForm>
      </CardHeader>

      <CardBody>
        {submitData.main && (
          <p>Temperature: {submitData.main.temp}&deg;C</p>
        )}
      </CardBody>
      <CardFooter>
        
      </CardFooter>
    </Card>
  )
}

export default WeatherCard
