class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=b3b54cab6dd7b97f9a85a319540bfbf9';

    // function for get data
    getResources = async (url) => {
        const res = await fetch(url)
            .then(data => data.json());
        if(res.status !== 'Ok') throw new Error('The value is underfing: 404');

        return await res; 
    }

    // get array with all heroes
    getAllHeroes = async () => {
        const res = await this.getResources(`${this._apiBase}characters?limit=9&offset=300&${this._apiKey}`);
        return res.data.results.map(this._transformForSingleHero); // return array with Promises
    }

    // get hero with id 
    getSinglHero = async (id) => {
        const res = await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformForSingleHero(res.data.results[0]);
    }

    _transformForSingleHero = async (hero) => {
        return {
                name: hero.name,
                description: hero.description,
                thumbnail: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
                homePage: hero.urls[0].url,          
                wiki: hero.urls[0].url,
            }
    }
}

export default MarvelServices;
