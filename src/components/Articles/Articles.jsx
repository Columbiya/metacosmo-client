import React, { useEffect } from 'react'
import articlesStore from '../../store/articlesStore'
import { observer } from 'mobx-react-lite';
import { API_URL } from '../../consts';

const Articles = (props) => {
    const articles = articlesStore.articles

    useEffect(() => {
        async function getArticles() {
            await articlesStore.getArticles()
        } 

        getArticles()
    }, [articlesStore.page])

    return (
        <>
            {articles.map(article => (
                <>
                    <div>
                        Title: {article.title}
                        <br />
                        Hider: {article.hider}
                        <br />
                        Text: {article.text}
                        <br />
                        boldText: {article.boldText}
                        <br />
                        Author: {article.author}
                        <br />
                        Address: {article.address}
                        <br />
                    </div>
                    <hr />
                </>
            ))}
        </>
    )
}

export default observer(Articles)