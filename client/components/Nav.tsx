import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { NavGroup, NavButton } from './Styled.tsx'

function Nav() {
  // TODO: call the useAuth0 hook and destructure user, logout, and loginWithRedirect
  const { user, logout, loginWithRedirect } = useAuth0()
  // TODO: replace placeholder user object with the one from auth0
  console.log(user)
  const userEmail = user ? user.email : null
  const userName = user ? user.name : null
  const userImg = user ? user.picture : null

  const myUserObj = {
    name: userName,
    email: userEmail,
    picture: userImg,
  }
  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect()
  }

  return (
    <>
      <NavGroup>
        <IfAuthenticated>
          <NavButton onClick={handleSignOut}>Sign out</NavButton>
          {myUserObj && (
            <>
              <p>Signed in as: {myUserObj?.name}</p>
              <p>Email: {myUserObj?.email}</p>
              <img src={myUserObj?.picture} alt="avatar" />
            </>
          )}
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
