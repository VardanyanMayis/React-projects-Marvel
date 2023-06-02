import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import { Fragment } from 'react';

import './HeroList.scss';


class HeroList extends Component {
    state = {
        heroes: [],
        loading: true,
        error: false,
        offset: 300,
    }
    getResurses = new MarvelServices();

    componentDidMount() {
        this.onRequest();
    }

    onLoaded = (newHeroList) => {
        this.setState(({heroes, offset}) => ({
            heroes: [...heroes, ...newHeroList],
            loading: false,
            offset: offset + 9,
        }))
    }

    onRequest = (offset) => {
        this.getResurses.getAllHeroes(offset)
            .then(heroes => this.onLoaded(heroes))
            .catch(error => {
                this.setState({error: true});
            });
    }

    getHeroList = (heroes) => {
        const items = heroes.map(hero => {
            let imgStyle = {'objectFit' : 'cover'};
            if (hero.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <Fragment key={hero.id.id}>
                    <div 
                        onClick={() => this.props.onSelectedHer(hero.id.id)} 
                        className="hero__item" 
                        >
                        <div className="img__block">
                        <img src={hero.thumbnail} alt="foto hero"  style={imgStyle}/>
                        </div>
                        <div className="hero__name">
                            {hero.name}
                        </div>
                    </div>
                </Fragment>
            )
        })

        return (
            <>
                {items}
            </>
        )
    } 

    render() {
        const {loading, heroes, error, offset} = this.state;

        return (
            <div className="hero__contnet">
                <div className="hero__list">
                {error ? <ErrorMessage /> : loading ? <Spinner /> : this.getHeroList(heroes)}

                </div>
                <button
                onClick={() => this.onRequest(offset)} 
                className='button button__main'>
                    <div className="inner">LOAD MORE</div>
                </button>
            </div>
        )
    }
}

export default HeroList;
