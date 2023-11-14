// TODO: import useAuth0 function
import { useAuth0 } from '@auth0/auth0-react'

const useIsAuthenticated = () => {
  // TODO: call the useAuth0 hook, destructure and return isAuthenticated

  // Can write it this way as i first did:
  // return useAuth0().isAuthenticated

  // Gerard would usually write it like this because (it's important that the hooks are called in the same order each time - so they all line up on the right hand side; like a list of hooks)
  const { isAuthenticated } = useAuth0()
  return isAuthenticated
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
