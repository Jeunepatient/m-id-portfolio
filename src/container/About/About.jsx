import {useState, useEffect} from 'react'
import React from 'react'
import './About.scss'
import {motion} from 'framer-motion'
import { images } from '../../constant'
import { urlFor, client } from '../../client'
import { AppWrap , MotionWrapper} from '../../Wrapper'
const abouts = [
    {title: 'web Development', description : 'am a good web developer',imgUrl:images.about01},
    {title: 'web Design', description : 'am a good web design',imgUrl:images.about02},
    {title: 'Data engineer', description : 'am a good data engeneer',imgUrl:images.about03},
    {title: 'fullStack', description : 'am a good fullstack developper',imgUrl:images.about04 },
]
const About = () => {
    const [about, setAbouts] = useState([])
    useEffect(()=>{
        const query = '*[_type=="abouts"]'
        client.fetch(query)
        .then((data)=> {setAbouts(data)})
    },[])

    return ( 
        <>
            <h2  className='head-text'> I know that <span>Good platform </span> <br/>means <span>Good Business</span>
            </h2>

            <div className='app__profiles'>
                {
                    abouts.map((about, index)=> (
                        <motion.div
                        whileInView={{opacity : 1}}
                        whileInHover={{scale: 1.1}}
                        transition={{duration: 0.5, type:'tween'}}
                        className='app__profile-item'
                        key={about.title + index}
                        >
                            <img src={about.imgUrl} alt={about.title} />
                            <h2 className='bold-text' style={{marginTop:'20px'}}> {about.title} </h2>
                            <p className='p-text' style={{marginTop:'10px'}}> {about.description} </p>
                        </motion.div>
                    ))
                }
            </div>
        </>
     );
}
 
export default AppWrap(
    MotionWrapper(About, 'app__about') , 
    'about',
    'app__whitebg'
    );