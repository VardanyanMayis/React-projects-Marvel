import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';

import './RandomHero.scss';

import armor from '../../resources/img/Armor.png';


class RandomHero extends Component {
    constructor(props) {
        super(props);
        this.getRandomHero();

        this.state = {
            hero: {
                name: null,
                description: null,
                thumbnail: null,
                homePage: null,
                wiki: null
            }
        }
    }

    onLoadHero = (hero) => {
        this.setState({hero})
    }

    getRandomHero = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        const getRequest = new MarvelServices();
        getRequest.getSinglHero(id)
            .then(this.onLoadHero);
    }

    render() {
        const {name, description, thumbnail, homePage, wiki} = this.state.hero;
        let curectDescription = '';

        if(description === '' || !description) {
            curectDescription = <p>Sorry but information about this hero is undefined:<br /><br /> if you want to get information about it you can search it in google or reade documentation`</p>
        } else {
            curectDescription = description;
            if(curectDescription.length > 450) {
                curectDescription = curectDescription.slice(0, 447) + '...';
            }
        }

        return (
            <div className="app__rundom">
                <div className="random__result">
                    <div className="random__content">
                        <div className="hero__img">
                            <img src={thumbnail} className="hero__photo" alt="hero foto" />
                        </div>
                        <div className="hero__info">
                            <div className="info__title">{name}</div>
                            <div className="info__text">{curectDescription}</div>
    
                            <div className="info__btns">
                                <button className='button button__main'>
                                    <div className="inner">
                                        <a target="_blank" href={homePage} rel="noreferrer">HOMEPAGE</a>
                                    </div>
                                </button>
    
                                <button className='button button__secondary'>
                                    <div className="inner">
                                        <a target="_blank" href={wiki} rel="noreferrer">WIKI</a>
                                    </div>
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
    
                        <button
                            onClick={this.getRandomHero}
                            className='button button__main'>
                            <div className="inner">Try it</div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RandomHero;
