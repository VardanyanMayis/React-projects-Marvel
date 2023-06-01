import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../Spinner/Spinner'
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import './RandomHero.scss';

import armor from '../../resources/img/Armor.png';


class RandomHero extends Component {
    state = {
        loading: true,
        error: false,
        hero: {}
    }
    getRequest = new MarvelServices();

    // for the first run 
    componentDidMount() {
        const randomBtn = document.querySelector('#getRandom');
        randomBtn.addEventListener('click', this.getRandomHero);
        this.getRandomHero();
    }

    componentWillUnmount() {
        const randomBtn = document.querySelector('#getRandom');
        randomBtn.removeEventListener('click', this.getRandomHero);
    }


    onLoadHero = (hero) => {
        this.setState({hero, loading: false, error: false});
    }

    getRandomHero = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        if(!this.state.loading) {
            this.setState({loading:true});
            console.log('Change loading status');
        }

        this.getRequest.getSinglHero(id)
            .then(this.onLoadHero)
            .catch(() => this.setState({error: true, loading: false}));
    }

    render() {
        console.log('rendering...');
        const {loading, hero, error} = this.state;

        return (
            <div className="app__rundom">
                <div className="random__result">

                    {(error) ? <ErrorMessage /> : (loading) ? <Spinner /> 
                        : <ShowResult hero={hero} />}

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
                            id='getRandom'
                            // onClick={this.getRandomHero}
                            className='button button__main'>
                            <div className="inner">Try it</div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const ShowResult = ({hero}) => {
    // Validation for description
    const descriptionValidation = (desc) => {
        let curectDescription;
        if(desc === '' || !desc) {
            curectDescription = <p>Sorry but information about this hero is undefined:<br /><br /> if you want to get information about it you can search it in google or reade documentation`</p>
        } else {
            curectDescription = desc;
            if(curectDescription.length > 450) {
                curectDescription = curectDescription.slice(0, 447) + '...';
            }
        }
        return curectDescription;
    }

    const {name, description, thumbnail, homePage, wiki} = hero;
    let curectDescription = descriptionValidation(description);

    return (
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
    )        
}

export default RandomHero;
