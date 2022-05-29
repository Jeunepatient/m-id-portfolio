import React, {useState, useEffect} from 'react'
import {AiFillEye, AiFillGithub} from 'react-icons/ai'
import {motion} from 'framer-motion'
import {AppWrap, MotionWrapper} from './../../Wrapper'
import { images } from '../../constant'
import {urlFor, client} from '../../client'
import './Work.scss'
const worklocal = [
    {id:1,title: 'web Development', description : 'am a good web developer',imgUrl:images.about01, tags : ['UI/UX']},
    {id:2,title: 'web Design', description : 'am a good web design',imgUrl:images.about02, tags: ['Frontend']},
    {id:3,title: 'Data engineer', description : 'am a good data engeneer',imgUrl:images.about03, tags: ['Data engineer']},
    {id:4,title: 'Backend', description : 'am a good fullstack developper',imgUrl:images.about04 , tags: ['Backend']},
]
const Work = () => {
    const [activeFilter, setActiveFilter]=useState('All')
    const [animateCard, setAnimateCard] = useState({y:0, opacity:1})
    const [works, setWorks] = useState([])
    const [filterwork,setFillWork] = useState([])

    useEffect(() => {
        const query = '*[_type == "works"]';
    
        client.fetch(query).then((data) => {
           setWorks(data)
            setFillWork(data)
        });
      }, []);
     
      
    const handleWorkFilter = item => {
        setActiveFilter(item)
        setAnimateCard({y:100, opacity: 0})

        setTimeout(()=> {
            setAnimateCard({y:0, opacity: 1})
            // item === 'All' ? setFillWork(works) : setFillWork(works.filter((work)=> work.tags.includes(item)))
            if(item === 'All'){
                setFillWork(works)
            } else{
                setFillWork(works.filter((work)=> work.tags.includes(item)))
                
                // setFillWork(works.filter(work => work.tags[0] === item))
            }
        }, 500)
    }
   
    return ( 
        <>
           <h2 className='head-text'>My creative <span>Portfolio </span>means a Good spnap up</h2>

           <div className='app__work-filter'>
                {['UI/UX', 'Frontend', 'Backend', 'All' ,'Data engineer','Fullstack'].map((item, index)=> (
                    <div
                    key={index}
                    onClick={()=> handleWorkFilter(item)}
                    className={`app__work-filter-item app__flex p-tex ${activeFilter === item ? 'item-active' : ''}`}
                    >
                        {item}
                    </div>
                ))}
           </div>
           <motion.div
           animate={animateCard}
           transition= {{duration : 0.5, delayChildren :0.5}}
           className="app__work-portfolio"
           >
               
               {
                   filterwork.map((work, index)=> (
                       <div className='app__work-item app__flex' key={index}>
                           <div className='app__work-img app__flex'>
                               <img src={urlFor(work.imgUrl)} alt={work.name} />
                               {/* <img src={work.imgUrl} alt={work.title} /> */}
                               <motion.div 
                               whileHover={{opacity : [0, 1]}}
                               transition = {{duration : 0.25, ease :'easeInOut', staggerChildren : 0.5}}
                               className='app__work-hover app__flex'
                               >
                                   <a href={work.projectLink} target="_blank" rel='noreferrer'>
                                       <motion.div
                                       whileInView={{scale : [0, 1]}}
                                       whileHover={{scale : [1, 0.9]}}
                                       transition ={{duration : 0.25, ease: 'easeInOut'}}
                                       className =' app__flex'
                                       >
                                           <AiFillEye />
                                       </motion.div>
                                   </a>
                                   <a href={work.codeLink} target="_blank" rel='noreferrer'>
                                       <motion.div
                                       whileInView={{scale : [0, 1]}}
                                       whileHover={{scale : [1, 0.9]}}
                                       transition ={{duration : 0.25, ease: 'easeInOut'}}
                                       className =' app__flex'
                                       >
                                           <AiFillGithub/>
                                       </motion.div>
                                   </a>
                               </motion.div>
                            </div>

                            <div className='app__work-content app__flex'>
                                <h4 className='bold-text'> {work.title} </h4>
                                <p className='p-text' style={{marginTop : 10}}> {work.description} </p>
                                <div className='app__work-tag app__flex'>
                                    <p className='p-text'> {work.tags[0] && work.tags[0]} </p>
                                </div>
                            </div>
                       </div>
                   ))
               }
           </motion.div>
        </>
     );
}
 

export default AppWrap(
    MotionWrapper(Work, 'app__works') , 
    'work',
    'app__primarybg'
    );