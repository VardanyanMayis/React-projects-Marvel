import './HeroList.scss';

import hero from '../../resources/img/hero.jpg';

const HeroList = () => {
    let itemCount = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const list = itemCount.map(() => (
        <div className="hero__item">
        <div className="img__block">
            <img src={hero} alt="foto hero" />
        </div>
        <div className="hero__name">
            ABYSS
        </div>
        </div>
    ))

    return (
        <div className="hero__contnet">
            <div className="hero__list">
                {list}
            </div>

            <button className='button button__main'>
                <div className="inner">LOAD MORE</div>
            </button>
        </div>
    )
}

export default HeroList;
