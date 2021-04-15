import React from 'react'
import './Home.css'
import EzrumBackgroundImg from '../../../assets/ezrum_hero_background.jpeg'
import { Button, Card } from 'react-bootstrap';
import Navlink from '../../../components/Navbar/Navlink'
// import flexibilityIcon from '../../assets/SVG/flexibility.svg';
import EducationIcon from '../../../assets/SVG/cast_for_education.svg';
import { navbarHeight } from '../../../util/Util'

const boxInfo = [
  {
    Icon: <img height='35' width='35' src={EducationIcon} alt='1st iconsss asjjfh;d sdf d' />,
    title: 'Virtuality'
  },
  {
    Icon: <img height='35' width='35' src={EducationIcon} alt='2nd icon asofhasjdfnal fdj fjlksdanf' />,
    title: 'Flexibility',
  },
  {
    Icon: <img height='35' width='35' src={EducationIcon} alt='3rd icon laksjdfn asojf naps df' />,
    title: 'Simplicity',
  }
]


function Home({ handleUserType }) {
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
                <p>
                  {title}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='home__right'>
          <Card className='p-3'>
            <h2>Get Started</h2>
            <hr />
            <p>
              Take less time looking for someone and more time learning.
            </p>
            <div className='d-flex'>
              <Navlink path='/signin'>
                <Button>Sign In</Button>
              </Navlink>
              <Navlink path='/signup'>
                <Button onClick={() => handleUserType('tutor')}>Become a tutor</Button>
              </Navlink>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home