import { makeAutoObservable } from 'mobx'
import { axios } from './../http/http';

class NewsStore {
    _news = []
    _page = 1
    _limit = 8
    _count = 0

    constructor() {
        makeAutoObservable(this)
    }

    get news() {
        return this._news
    }

    set news(value) {
        this._news = value
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

    async getNews() {
        const response = await axios.get(`/news?page=${this._page}&limit=${this._limit}`)
        const data = response.data
        this.news = data.rows
        this.count = data.count
    }

    async createNew(data) {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('subtitle', data.subtitle)
        formData.append('boldText', data.boldText)
        formData.append('text', data.text)
        formData.append('oneColumnContent', data.oneColumnContent)
        formData.append('author', data.author)
        formData.append('hider', data.hider)
        formData.append('twoColumnContentFirst', data.twoColumnTextFirst)
        formData.append('twoColumnContentSecond', data.twoColumnTextSecond)
        formData.append('img', data.img[0])

        const response = await axios.post('/news', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return response.data
    }
}

export default new NewsStore()