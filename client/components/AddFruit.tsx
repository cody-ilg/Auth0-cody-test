import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FruitData } from '../../models/fruit.ts';
import { GridForm, ColOne, ColTwoText, Button } from './Styled.tsx';

interface AddFruitFormProps {
  onAdd: (fruit: FruitData) => void;
  onClose: () => void;
}

const initialFruit: FruitData = {
  name: '',
  averageGramsEach: 0,
};

const AddFruitForm: React.FC<AddFruitFormProps> = ({ onAdd, onClose }) => {
  const [newFruit, setNewFruit] = useState(initialFruit);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFruit((prevFruit) => ({ ...prevFruit, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(newFruit);
  };

  return (
    <>
      <h2>Add new</h2>
      <GridForm onSubmit={handleSubmit}>
        {/* Form inputs for name */}
        <ColOne htmlFor="name">Name:</ColOne>
        <ColTwoText
          type="text"
          name="name"
          id="name"
          value={newFruit.name}
          onChange={handleChange}
        />

        {/* Form inputs for averageGramsEach */}
        <ColOne htmlFor="averageGramsEach">Average Grams Each:</ColOne>
        <ColTwoText
          type="number"
          name="averageGramsEach"
          id="averageGramsEach"
          value={newFruit.averageGramsEach}
          onChange={handleChange}
        />

        {/* Submit and Close buttons */}
        <Button type="submit" disabled={!newFruit.name || newFruit.averageGramsEach === 0}>
          Add fruit
        </Button>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </GridForm>
    </>
  );
};

export default AddFruitForm;
