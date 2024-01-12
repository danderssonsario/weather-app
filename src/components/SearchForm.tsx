import { useState, ChangeEvent, FormEvent } from 'react'
import { Input, Button } from '@nextui-org/react'

 interface LocationData {
    main: {
      temp: number
    }
  }

  interface Props {
    onSubmitData: (data: LocationData) => void
  }

function SearchForm({ onSubmitData } : Props) {

  const [input, setInput] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const [latitude, longitude] = await fetchCoordinates();

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
      );
      const data: LocationData = await response.json();

      onSubmitData(data); // Call the parent's callback with the data
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
    </>
  );
}

export default SearchForm
