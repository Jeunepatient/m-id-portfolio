import React, { useState } from 'react'
import './Footer.scss'
import { images } from '../../constant';
import { AppWrap, MotionWrapper } from '../../Wrapper';
import {client} from '../../client'






const Footer = () => {
    const [formData, setFomData]=useState({name:'',email: '', message:''})
    const [isFormSubmitted, setisFormsubmitted] = useState(false)
    const [loading, setloading]= useState(false)
    const [error, seterror] = useState('')
    const {name, email, message} = formData
    const handleChangeInput = e=> {
        const {name, value} = e.target
        setFomData({...formData, [name]:value})
        console.log(formData)
    }


    const handleSubmit= ()=> {
        setloading(true)
        const contact = {
            _type : 'contact',
            name: name,
            email :email,
            message: message,
        }

        client.create(contact)
        .then(()=> {
            setisFormsubmitted(true)
            setloading(false)
        })
        .catch(err => console.log(err))
    }
    return ( 
        <>
           <h2 className='head-text'>tell us what you think about our services</h2>
           <div className='app__footer-cards'>
                <div className='app__footer-card'>
                    <img src={images.email} alt='email' />
                    <a href="mailto:di84454@gmail.com" className="p-text">di84454@gmail.com</a>
                </div>
                <div className='app__footer-card'>
                    <img src={images.mobile} alt='mobile' />
                    <a href="tel:+221 77 825 25" className="p-text">+221 77 825 25</a>
                </div>
            </div>
            {!isFormSubmitted ? 
            ( <div className="app__footer-form app__flex">
                <div className="app__flex">
                    <input className="p-text" type="text" placeholder="Your Name" name="name" value={name} onChange={handleChangeInput} />
                </div>
                <div className="app__flex">
                    <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
                </div>
                <div>
                    <textarea
                    className="p-text"
                    placeholder="Your Message"
                    value={message}
                    name="message"
                    onChange={handleChangeInput}
                    />
                </div>
                <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
            </div>
            )
            :
            (<div>
                <h3 className='head-text'> {console.log(isFormSubmitted)} thank you for getting in touch</h3>
            </div>)
                }
                {error && <div className='p-text'> {error} </div>}
           
       
        </>
     );
}
 
export default AppWrap(MotionWrapper(Footer, 'app__footer'),
'contact',
"app__whitebg");