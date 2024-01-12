import { useState, ChangeEvent, FormEvent } from 'react'
import { Input, Button } from '@nextui-org/react'

 interface LocationData {
    main: {
      temp: number
    }
  }

function SearchForm({ }) {

  const [input, setInput] = useState<string>('');
  const [locationData, setLocationData] = useState<LocationData>({ main: { temp: 0}});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const [latitude, longitude] = await fetchCoordinates();

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`
      );
      const data: LocationData = await response.json();
      setLocationData(data);
      //onSubmitInput(data); // Call the parent's callback with the data
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCoordinates = async (): Promise<[number, number]> => {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${import.meta.env.VITE_API_KEY}`
    );
    const data: { lat: number; lon: number }[] = await response.json();
    return [data[0].lat, data[0].lon];
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <form className='flex flex-row' onSubmit={handleSubmit}>
        <Input
          size='sm'
          type='text'
          value={input}
          placeholder='Location'
          onChange={handleChange}
        />
        <Button size='lg' type='submit' color='secondary'>
          Button
        </Button>
      </form>
      <div>{locationData?.main.temp}</div>
    </>
  );
}

export default SearchForm
