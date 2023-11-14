import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { NavGroup, NavButton } from './Styled.tsx'
import { useAuth0 } from '@auth0/auth0-react'
function Nav() {
  // TODO: call the useAuth0 hook and destructure user, logout, and loginWithRedirect
  // TODO: replace placeholder user object with the one from auth0
  const {logout,loginWithRedirect,user} = useAuth0()
  // const user = {
  //   nickname: 'john.doe',
  // }
  console.log(user)
  const handleSignOut = () => {
    console.log('sign out')
    return logout()
  }

  const handleSignIn = () => {
    console.log('sign in')
    return loginWithRedirect()
  }

  return (
    <>
      <NavGroup>
        <IfAuthenticated>
          <NavButton onClick={handleSignOut}>Sign out</NavButton>
          {<p>Signed in as: {<img src={user?.picture} alt="" />}{user?.nickname}</p>}
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
