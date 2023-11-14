import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as API from './api.ts'

export function useFruits() {
  const query = useQuery({
    queryKey: ['fruits'],
    queryFn: API.getFruits,
  })

  return {
    ...query,
    update: useUpdateFruit(),
    delete: useDeleteFruit(),
    add: useAddFruit(),
  }
}


// --------------------------------
// is able to generically call a mutation. the only input is a 
// mutation function. And then you can access the mutatation obj
// afterwards. It is for anything relating to fruits - this is what updates
// afterwards. 
export function useFruitMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['fruits'])
    },
  })

  return mutation
}




// ----------------------------------------------
// this code actually calls the mutation function and links it to
// the api function for database access. Effectively you can call
// this function and it will create the mutation and input the mutation
// function in one step!!!
export function useUpdateFruit() {
  return useFruitMutation(API.updateFruit)
}

export function useDeleteFruit() {
  return useFruitMutation(API.deleteFruit)
}

export function useAddFruit() {
  return useFruitMutation(API.addFruit)
}
