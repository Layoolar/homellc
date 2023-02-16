import CaretDownIcon from '../Icons/CaretDownIcon'
// import Suitcase from '../Icons/Suitcase'
// import { animationRightVariant,navLinks } from '../../utils/data'
import './sidebar.scss'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
interface Props {
  isNavOpen: boolean
}
const index = ({ isNavOpen }: Props) => {
  const isActiveStyle = {
    background: '#97fafa28',
    borderLeft: '3px solid #39CDCC',
  }


const navLinks: { title: string; href: string, category: string }[] = [
    {
        title: 'Home',
        href: '/home',
        category: 'home',
    },
    {
        title: 'Calculator',
        href: '/#&',
        category: 'details',
    },
    {
        title: 'Process',
        href: '/#&',
        category: 'details',
    },
    {
        title: 'Benefits',
        href: '/#&',
        category: 'details',
    },
    {
        title: 'Constraints',
        href: '/#&',
        category: 'details',
    },
    {
        title: 'Home Ownership Guide',
        href: '/#&',
        category: 'blog',
    },
    {
        title: 'Market Insights',
        href: '/#&',
        category: 'blog',
    },
    {
        title: 'Expert Interviews',
        href: '/#&',
        category: 'blog',
    },
    {
        title: 'Check If You Qualify',
        href: '/#&',
        category: 'others',
    },
    {
        title: 'Schedule A Call',
        href: '/#&',
        category: 'others',
    },
  ]

  const navLinkSequence = (i: number, navlink: any) => (
    <motion.span
      initial={{ opacity: 0, translateY: -40 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.2, delay: i * 0.1 }}
      key={i}>
      <NavLink to={navlink.href} className='navlinks'
        style={({ isActive }) => isActive ? isActiveStyle : undefined}
      >
        <p>{navlink.title}</p>
      </NavLink>
    </motion.span>
  )

  const renderHome = navLinks.filter((val => val.category.includes('home'))).map((navlink, i) => (
    navLinkSequence(i, navlink)
  ))
    const renderDetails = navLinks.filter((val => val.category.includes('details'))).map((navlink, i) => (
    navLinkSequence(i, navlink)
  ))

  const renderBlog = navLinks.filter((val => val.category.includes('blog'))).map((navlink, i) => (
    navLinkSequence(i, navlink)
  ))

  const renderOthers = navLinks.filter((val => val.category.includes('others'))).map((navlink, i) => (
    navLinkSequence(i, navlink)
  ))



  return (
    <>
      {isNavOpen &&
        <motion.section
          initial="initial"
          animate="final"
          exit="exit"
          className='sidebar__wrapper'>
          <div className='sidebar__content'>
            {renderHome}

            <h1 className='section__header'>Details</h1>
            {renderDetails}

            <h1 className='section__header'>Blog</h1>
            {renderBlog}

            <h1 className='section__header'>Others</h1>
            {renderOthers}

          </div>
        </motion.section>}
    </>
  )
}

export default index