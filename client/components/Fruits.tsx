import { Fruit, FruitData } from '../../models/fruit.ts'

import { useState } from 'react'
import SelectedFruitForm from './SelectedFruit.tsx'
import AddFruitForm from './AddFruit.tsx'
import { ErrorMessage } from './Styled.tsx'
import { useFruits } from '../hooks.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { addFruit, updateFruit, deleteFruit } from '../api.ts'
import { resourceUsage } from 'process'

type FormState =
  | {
      selectedFruit: Fruit
      show: 'selected'
    }
  | {
      selectedFruit: null
      show: 'add' | 'none'
    }

function Fruits() {
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormState>({
    selectedFruit: null,
    show: 'none',
  })
  const fruits = useFruits()

  const handleMutationSuccess = () => {
    handleCloseForm()
    setError('')
  }

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError('Unknown error')
    }
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
    onError: handleError,
  }

  const { getAccessTokenSilently } = useAuth0()

  const handleAdd = async (fruit: FruitData) => {
    // DONE: use getAccessTokenSilently to get an access token
    try {
      const token = await getAccessTokenSilently()
      console.log('This is a token', token)
      fruits.add.mutate({ fruit, token }, mutationOptions)
    } catch (error) {
      handleError(error)
    }
  }

  const handleUpdate = async (fruit: Fruit) => {
    // DONE: use getAccessTokenSilently to get an access token
    try {
      const token = await getAccessTokenSilently()

      fruits.update.mutate({ fruit, token }, mutationOptions)
    } catch (error) {
      handleError(error)
    }
  }

  const handleDeleteFruit = async (id: number) => {
    // DONE: use getAccessTokenSilently to get an access token
    try {
      const token = await getAccessTokenSilently()

      fruits.delete.mutate({ id, token }, mutationOptions)
    } catch (error) {
      handleError(error)
    }
  }

  const hideError = () => {
    setError('')
  }

  const handleOpenAddForm = () => {
    setForm({ show: 'add', selectedFruit: null })
  }

  const handleCloseForm = () => {
    setForm({ show: 'none', selectedFruit: null })
  }

  const handleSelectFruit = (fruit: Fruit) => {
    setForm({ show: 'selected', selectedFruit: fruit })
  }

  if (fruits.isLoading) {
    let failures = ''
    if (fruits.failureCount > 0) {
      failures = ` (failed ${fruits.failureCount} times)`
    }

    return <div>Loading... {failures}</div>
  }

  let fetchStatus = ''
  if (fruits.add.isLoading) fetchStatus = 'Adding...'
  if (fruits.update.isLoading) fetchStatus = 'Updating...'
  if (fruits.delete.isLoading) fetchStatus = 'Deleting...'
  if (fruits.isRefetching) fetchStatus = 'Refreshing...'

  if (fruits.error instanceof Error) {
    return (
      <ErrorMessage>Failed to load fruits: {fruits.error.message}</ErrorMessage>
    )
  }

  return (
    <>
      {error !== '' && (
        <ErrorMessage onClick={hideError}>Error: {error}</ErrorMessage>
      )}
      {fetchStatus !== '' && <div>{fetchStatus}</div>}
      <ul>
        {fruits.status === 'success' &&
          fruits.data.map((fruit) => (
            <li key={fruit.id}>
              <button onClick={() => handleSelectFruit(fruit)}>
                {fruit.name}
              </button>
            </li>
          ))}
      </ul>
      {form.show === 'add' ? (
        <AddFruitForm onAdd={handleAdd} onClose={handleCloseForm} />
      ) : (
        <button onClick={handleOpenAddForm}>Add a Fruit</button>
      )}
      {form.show === 'selected' && (
        <SelectedFruitForm
          key={form.selectedFruit.id}
          fruit={form.selectedFruit}
          onUpdate={handleUpdate}
          onDelete={handleDeleteFruit}
          onClose={handleCloseForm}
        />
      )}
    </>
  )
}

export default Fruits
