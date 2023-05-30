import './RandomHero.scss';

import armor from '../../resources/img/Armor.png';
import testHero from '../../resources/img/hero.jpg'

const RandomHero = () => {
    return (
        <div className="app__rundom">
            <div className="random__result">
                <div className="random__content">
                    <div className="hero__img">
                        <img src={testHero} className="hero__photo" alt="hero foto" />
                    </div>
                    <div className="hero__info">
                        <div className="info__title">THOR</div>
                        <div className="info__text">As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate..</div>

                        <div className="info__btns">
                            <button className='button button__main'>
                                <div className="inner">HOMEPAGE</div>
                            </button>

                            <button className='button button__secondary'>
                                <div className="inner">WIKI</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="get__random">
                <div 
                    style={{
                        background: `url('${armor}')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'bottom right',
                    }} 
                    className="random__content">

                    <p className="get__random__title">Random character for today! <br /> Do you want to get to know him better?</p>
                    <p className="get__random__text">Or choose another one</p>

                    <button className='button button__main'>
                        <div className="inner">Try it</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RandomHero;
