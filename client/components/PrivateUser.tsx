import { useAuth0 } from '@auth0/auth0-react'
interface Props {
  children: React.ReactNode
  userId: string
}
export default function PrivateUser(props:Props){
 
    const { userId, children } = props
    const { user } = useAuth0()
    return userId == user?.sub? <>{children}</> : null
    
}