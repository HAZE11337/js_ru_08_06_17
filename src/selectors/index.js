import {createSelector} from 'reselect'

const filtersGetter = state => state.filters
const articlesGetter = state => state.articles
const articlesIdGetter = (state, props) => props.id
const commentsGetter = state => state.comments
const idGetter = (state, props) => props.id

export const filtratedArticlesSelector = createSelector(articlesGetter, filtersGetter, (articles, filters) => {
    const {selected, dateRange: {from, to}} = filters
    console.log('---', 'recomputing filtration')

    return articles.filter(article => {
        const published = Date.parse(article.date)
        return (!selected.length || selected.includes(article.id)) &&
            (!from || !to || (published > from && published < to))
    })
})

export const articleSelectorFactory = () => createSelector(articlesGetter, articlesIdGetter, (articles, id) => {
    console.log('---', 'getting article', id)
    return articles[id]
})

export const commentSelectorFactory = () => createSelector(commentsGetter, idGetter, (comments, id) => {
    console.log('---', 'getting comment', id)
    return comments[id]
})