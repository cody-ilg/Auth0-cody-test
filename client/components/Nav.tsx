import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { NavGroup, NavButton } from './Styled.tsx'
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  const { user, logout, loginWithRedirect } = useAuth0()
  // USER: This captures the users information (such as a username), from the result of the useAuth0 hook
  // LOGOUT: It logs the user out from their username - function provided by useAuth0
  // LOGINWITHREDIRECT: This initiates the authentication process, and often redirects the user to the login page.

  const handleSignOut = () => {
    console.log('sign out')
  }

  const handleSignIn = () => {
    console.log('sign in')
  }

  return (
    <>
      <NavGroup>
        <IfAuthenticated>
          <NavButton onClick={handleSignOut}>Sign out</NavButton>
          {user && <p>Signed in as: {user?.nickname}</p>}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavButton onClick={handleSignIn}>Sign in</NavButton>
        </IfNotAuthenticated>
      </NavGroup>
      <h1>Fruit FTW!</h1>
    </>
  )
}

export default Nav
