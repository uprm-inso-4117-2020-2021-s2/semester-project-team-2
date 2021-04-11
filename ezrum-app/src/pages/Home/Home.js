import React from 'react'
import './Home.css'
import EzrumBackgroundImg from '../../assets/ezrum_hero_background.jpeg'
import { Button} from 'react-bootstrap';
import Navlink from '../../components/Navbar/Navlink'
import FlexibilityIcon from '../../assets/Flexibility.png';
import EducationIcon from '../../assets/Virtuality.png';
import SimplicityIcon from '../../assets/Simplicity.png';
const boxInfo = [
  {
    Icon: <img height='60' width='60' src={EducationIcon} alt='1st icon' />,
    title: 'Virtuality'
  },
  {
    Icon: <img height='60' width='60' src={FlexibilityIcon} alt='2nd icon' />,
    title: 'Flexibility',
  },
  {
    Icon: <img height='60' width='60' src={SimplicityIcon} alt='3rd icon' />,
    title: 'Simplicity',
  }
]


function Home({ handleUserType }) {
  return (
    <div className='home' style={{ height: window.innerHeight }}>
      <div className='home__hero'>
        <img className='home__logo' src={EzrumBackgroundImg} alt='Background Hero Image' />
        <div className='home__left'>
          <div className='home__buumInfo'>
            {boxInfo.map(({ Icon, title }) =>
              <div className='home__box' key={title}>
                <div className='home__boxIcon'>
                  {Icon}
                </div>
                <p className='homeBoxTitles'>
                  {title}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='home__right'>
          <form className='byIngredient__selectedIngredients p-3'>
            <div className='getStartedArea'>
              <h2 className='getStartedTitle'>
                Get Started!
              </h2>
            </div>
            <hr/>
            <div>
              <p className='formBody'>
                Take less time looking for someone and more time learning.
              </p>
            </div>
            <div className='d-flex'>
              <div className='signInArea'>
                <Navlink path='/signin'>
                  <Button className='signInButt'>Sign In</Button>
                </Navlink>
              </div>
              <div className='becomeTutorArea'>
                <Navlink path='/signup'>
                  <Button className='becomeTutorButt' onClick={() => handleUserType('tutor')}>Become a Tutor</Button>
                </Navlink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home