import { makeAutoObservable } from 'mobx'
import { axios } from './../http/http';

class ArticlesStore {
    _articles = []
    _page = 1
    _limit = 16
    _count = 0

    constructor() {
        makeAutoObservable(this)
    }
    
    get articles() {
        return this._articles
    }

    set articles(value) {
        this._articles = value
    }

    get page() {
        return this._page
    }

    set page(value) {
        this._page = value
    }

    get limit() {
        return this._limit
    }

    set limit(value) {
        this._limit = value
    }
    
    get count() {
        return this._count
    }

    set count(value) {
        this._count = value
    }

    async getArticles() {
        const response = await axios.get(`/articles?limit=${this._limit}&page=${this._page}`)
        const data = response.data
        this.articles = data.rows
        this.count = data.count
    }

    async createArticle(data) {
        const payload = {
            "title": data.title,
            "quote": data.quote,
            "boldText": data.boldText,
            "text": data.text,
            "twoColumnContentFirst": data.twoColumnTextFirst,
            "twoColumnContentSecond": data.twoColumnTextSecond,
            "oneColumnContent": data.oneColumnContent,
            "address": data.address,
            "author": data.author,
            "hider": data.hider
        }
        const response = await axios.post('/articles', payload)
        return response.data
    }
}

export default new ArticlesStore()