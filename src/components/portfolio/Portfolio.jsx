import React from 'react'
import I1 from '../../static/images/p1.webp'
import I2 from '../../static/images/p2.webp'
import I3 from '../../static/images/p3.webp'
import I4 from '../../static/images/p4.webp'
import I5 from '../../static/images/p5.webp'
import I6 from '../../static/images/p6.webp'
import './Portfolio.css'

const data = [
  {
    id: 1,
    title: 'This is port Item',
    img: I1,
    github: '#',
    other: '#'
  },
  {
    id: 2,
    title: 'This is port Item',
    img: I2,
    github: '#',
    other: '#'
  },
  {
    id: 3,
    title: 'This is port Item',
    img: I3,
    github: '#',
    other: '#'
  },
  {
    id: 4,
    title: 'This is port Item',
    img: I4,
    github: '#',
    other: '#'
  },
  {
    id: 5,
    title: 'This is port Item',
    img: I5,
    github: '#',
    other: '#'
  },
  {
    id: 6,
    title: 'This is port Item',
    img: I6,
    github: '#',
    other: '#'
  }
]
const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>
      <div className="container port__container">
        {
          data.map(({ id, title, img, github, other }) => {
            return (
              <article className='port__item'>
                <div className='port__item__img'>
                  <img src={img} alt="" />
                </div>
                <h3>{ title}</h3>

                <div className="port__cta">
                  <a href={github} className='btn'>Github</a>
                  <a href={other} className='btn btn-primary'>Other</a>
                </div>

              </article>
            )
           })
       }
       
      </div>
    </section>
  )
}

export default Portfolio