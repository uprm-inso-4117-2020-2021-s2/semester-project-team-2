import React from 'react'
import './Home.css'
import EzrumBackgroundImg from '../../../assets/ezrum_hero_background.jpeg'
import { Button, Card } from 'react-bootstrap';
import Navlink from '../../../components/Navbar/Navlink'
import FlexibilityIcon from '../../../assets/Flexibility.png';
import EducationIcon from '../../../assets/Virtuality.png';
import SimplicityIcon from '../../../assets/Simplicity.png';
import { navbarHeight } from '../../../util/Util'

const boxInfo = [
  {
    Icon: <img height='40' width='40' src={EducationIcon} alt='1st icon' />,
    title: 'Virtuality'
  },
  {
    Icon: <img height='40' width='40' src={FlexibilityIcon} alt='2nd icon' />,
    title: 'Flexibility',
  },
  {
    Icon: <img height='40' width='40' src={SimplicityIcon} alt='3rd icon' />,
    title: 'Simplicity',
  }
]


function Home() {
  return (
    <div className='home'>
      <div className='home__hero' style={{ height: window.innerHeight - navbarHeight }}>
        <img className='home__logo' src={EzrumBackgroundImg} alt='Background Hero' />
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
          <form className='home__form p-4'>
            <h2 className='getStartedTitle'>
              Get Started!
              </h2>
            <hr />
            <div>
              <p className='formBody'>
                Take less time looking for someone and more time learning.
              </p>
            </div>
            <div className='d-flex'>
              <div className='signInArea mr-4'>
                <Navlink path='/signin'>
                  <Button className='signInBtn w-100' variant='light'>
                    <span>
                      Sign In
                    </span>
                  </Button>
                </Navlink>
              </div>
              <div className='becomeTutorArea'>
                <Navlink path='/signup'>
                  <Button className='becomeTutorButt w-100' variant='primary'>
                    Become a Tutor
                  </Button>
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