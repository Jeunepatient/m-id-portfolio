import React from 'react'
import {NavigationDots, SocialMedia} from '../component'
const AppWrap = (Component,idname, classNames) => function HOC() {
    return ( 
        <div id={idname} className={`app__container ${classNames}`}>
            <SocialMedia />
            <div className='app__wrapper app__flex'>
                <Component />

                <div className='copyright'>
                    <p className='p-text'>@2022 M-ID</p>
                    <p className='p-text'>All rights reserved</p>
                </div>
            </div>
            <NavigationDots active={idname} />
        </div>
     );
}
 
export default AppWrap;