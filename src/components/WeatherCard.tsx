import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import SearchForm from './SearchForm'

function WeatherCard() {
  return (
    <Card className='max-w-xl h-auto'>
      <CardHeader className='flex justify-center'>
        <SearchForm></SearchForm>
      </CardHeader>

      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <CardFooter>
        
      </CardFooter>
    </Card>
  )
}

export default WeatherCard
