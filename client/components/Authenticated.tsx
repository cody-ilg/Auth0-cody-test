// TODO: import useAuth0 function
import { useAuth0 } from '@auth0/auth0-react'
import { truncate } from 'fs'

const useIsAuthenticated = () => {
  // TODO: call the useAuth0 hook, destructure and return isAuthenticated
  const { isAuthenticated } = useAuth0()
  //returns true if isAuthenticated is true otherwise false
  //if undefined defaults to false
  return isAuthenticated === undefined ? false : isAuthenticated
}

interface Props {
  children: React.ReactNode
}
export function IfAuthenticated(props: Props) {
  const { children } = props
  return useIsAuthenticated() ? <>{children}</> : null
}

export function IfNotAuthenticated(props: Props) {
  const { children } = props
  return !useIsAuthenticated() ? <>{children}</> : null
}
