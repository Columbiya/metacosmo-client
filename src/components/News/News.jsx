import React, { useEffect } from 'react'
import newsStore from '../../store/newsStore'
import css from './News.module.scss'
import { axios } from './../../http/http';
import { observer } from 'mobx-react-lite';
import { IMAGES_API_URL } from '../../consts';

const News = props => {
    const news = newsStore.news

    useEffect(() => {
        async function getNews() {
            await newsStore.getNews()
        }
        getNews()
    }, [newsStore.page])

    return (
        <section className={css.news}>
            {news.map(oneNew => (
                <>
                    <div>
                        Title: {oneNew.title}
                        <br />
                        Hider: {oneNew.hider}
                        <br />
                        Author: {oneNew.author}
                        <br />
                        Bold Text:{oneNew.boldText}
                        <br />
                        First column out of two: {oneNew.twoColumnContentFirst}
                        <br />
                        Second column out of two: {oneNew.twoColumnContentSecond}
                        <br />
                        <img src={IMAGES_API_URL + `/${oneNew.img}`} />
                    </div>
                    <hr />
                </>

            ))}
        </section>
    )
}

export default observer(News)