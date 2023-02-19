import { useState } from 'react'
import Hamburger from '../Icons/Hamburger'
import LogoIcon from '../Icons/LogoIcon'
import Searchbar from '../Shared/Searchbar/Index'
import '../Navbar/navbar.scss'
import { useSelector, useDispatch } from 'react-redux';
import { onLogout } from '../../store/slices/auth/loginSlice'

interface Props {
  isNavOpen: boolean,
  setIsNavOpen: any
}

const Navbar = ({isNavOpen, setIsNavOpen }: Props) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userData = useSelector((state: any) => state.authReducers.login.userData);
  const thisUser = JSON.parse(userData);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(onLogout())
  }

  return (
    <nav className='nav__wrapper'>
      <div className='logo_wrapper'>
        <span onClick={()=> setIsNavOpen(!isNavOpen)} className='hamburger'><Hamburger /></span><LogoIcon />
      </div>
      <div className='interactive__board'>
        <div className='xm__hide'>
          <Searchbar />
        </div>
        <div className='interactive__board__content'>
          <div className='user__actions'>
            <h2 className='xm__hide'>{thisUser.userName}</h2>
            <button className='user__logout' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


