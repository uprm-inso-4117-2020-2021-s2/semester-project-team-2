import React from 'react'
import './Home.css'
import EzrumBackgroundImg from '../../assets/ezrum_hero_background.jpeg'
import { Button, Card } from 'react-bootstrap';
import Navbar from '../../components/Navbar/Navbar'
import Navlink from '../../components/Navbar/Navlink'
import flexibilityIcon from '../../assets/SVG/flexibility.svg';
import EducationIcon from '../../assets/SVG/cast_for_education.svg';

const boxInfo = [
  {
    Icon: <img height='35' width='35' src={EducationIcon} alt='' />,
    title: 'Virtuality'
  },
  {
    Icon: <img height='35' width='35' src={EducationIcon} alt='' />,
    title: 'Flexibility',
  },
  {
    Icon: <img height='35' width='35' src={EducationIcon} alt='' />,
    title: 'Simplicity',
  }
]


function Home() {
  return (
    <div className='home' style={{ height: window.innerHeight }}>
      <Navbar />
      <div className='home__hero'>
        <img className='home__logo' src={EzrumBackgroundImg} alt='Background Hero Image' />
        <div className='home__left'>
          <div className='home__buumInfo'>
            {boxInfo.map(({ Icon, title }) =>
              <div className='join__box' key={title}>
                <div className='join__boxIcon'>
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
          <Card className='byIngredient__selectedIngredients p-3'>
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
                <Button>Become a tutor</Button>
              </Navlink>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home
