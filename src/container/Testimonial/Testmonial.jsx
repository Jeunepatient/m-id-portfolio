import React, { useEffect, useState } from 'react'
import { AppWrap, MotionWrapper } from '../../Wrapper';
import {urlFor, client} from '../../client'
import { motion } from 'framer-motion';
import './Testimonial.scss'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
const Testmonial = () => {
    const [brands, setBrands] = useState([])
    const [testimonials, setTestimonial]=useState([])

    const [currentIndex, setCurrentIndex]=useState(0)
    
    const handleClick = index => {
        setCurrentIndex(index)
    }

    useEffect(()=>{
        const query = '*[_type == "testimonials"]';
        const brandsquery = '*[_type == "brands"]';

        client.fetch(query)
        .then((data)=>{
            setTestimonial(data)
        })

        client.fetch(brandsquery)
        .then((data)=> {
            setBrands(data)
        })
    },[])

    const test = testimonials[currentIndex]
    return ( 
        <>
           {testimonials.length  && (
               <>
                <div className='app__testimonial-item app__flex'>
                    {test.imgurl && <img src={urlFor(test?.imgurl)} alt={test.name} />}
                    <div className="app__testimonial-content">
                        <p className="p-text">{testimonials[currentIndex].feedback}</p>
                        <div>
                            <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                            <h5 className="p-text">{testimonials[currentIndex].company}</h5>
                        </div>
                    </div>
                </div>

                <div className='app__testimonial-btns app__flex'>
                    <div className='app__flex' onClick={()=> handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
                        <HiChevronLeft />
                    </div>
                    <div className='app__flex' onClick={()=> handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
                        <HiChevronRight />
                    </div>
                </div>

                <div className='app__testimonial-brands app__flex'>
                    {
                        brands.map((brand)=> (
                            <motion.div
                            whileInView={{opacity : [0, 1]}}
                            transition={{duration: 0.5 , type: 'tween'}}
                            key={brand.id}
                            >
                                <img src={urlFor(brand.imgUrl)} alt={brand.name } />
                            </motion.div>
                        ))
                    }
                </div>
                </>
           )}
        </>
     )
}
 
export default AppWrap(MotionWrapper(Testmonial, 'app__testimonial'),
'testimonials',
"app__primarybg");