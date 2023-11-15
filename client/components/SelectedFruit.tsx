import { Fruit } from '../../models/fruit.ts'
import PrivateUser from './PrivateUser.tsx'
import { useState } from 'react'

import { GridForm, ColOne, ColTwoText, Button } from './Styled.tsx'

interface Props {
  fruit: Fruit
  onUpdate: (updatedFruit: Fruit) => void
  onDelete: (id: number) => void
  onClose: () => void
}

function SelectedFruitForm({ fruit, onUpdate, onDelete, onClose }: Props) {
  const [updatedFruit, setUpdatedFruit] = useState(fruit)

  const { name: editingName, averageGramsEach: editingGrams } = updatedFruit
  const { name: currentName } = fruit

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUpdatedFruit({
      ...updatedFruit,
      [name]: value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onUpdate(updatedFruit)
  }

  const handleDeleteButtonClick = () => {
    onDelete(fruit.id)
  }

  return (
    <>
      <h2>Selected: {currentName}</h2>
      <GridForm onSubmit={handleSubmit}>
        <ColOne htmlFor="name">Name:</ColOne>
        <ColTwoText
          type="text"
          name="name"
          id="name"
          value={editingName}
          onChange={handleTextChange}
        />

        <ColOne htmlFor="averageGramsEach">Average Grams Each:</ColOne>
        <ColTwoText
          type="text"
          name="averageGramsEach"
          id="averageGramsEach"
          value={editingGrams}
          onChange={handleTextChange}
        />
      <PrivateUser userId={fruit.addedByUser}>
        <Button
          type="submit"
          disabled={editingName === '' || editingGrams === 0}
        >
          
          Update fruit
        </Button>
        <Button type="button" onClick={handleDeleteButtonClick}>
          Delete fruit
        </Button>
        </PrivateUser>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
        
      </GridForm>
    </>
  )
}

export default SelectedFruitForm
