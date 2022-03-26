import React, { useState } from 'react'
import css from './AdminPanel.module.scss'
import { Form, Field } from 'react-final-form'
import { mustBeDividedWithSymb, required } from '../../validators/validators'
import { composeValidators } from '../../validators/composeValidators'
import { Link } from 'react-router-dom'
import { NEWS_PATH } from '../../consts'
import { ARTICLES_PATH } from './../../consts';
import articlesStore from '../../store/articlesStore'
import newsStore from '../../store/newsStore'
import Select from 'react-select'

const AdminPanel = (props) => {
    const [isNewsShown, setNewsShown] = useState(false)
    const [isArticlesShown, setArticlesShown] = useState(false)
    const [hider, setHider] = useState('light')

    const options = [
        { value: 'light', label: 'light' },
        { value: 'dark', label: 'dark' }
    ]

    const onHideModal = e => {
        if (!e.target.classList.contains(css.modal)) {
            return
        }

        setNewsShown(false)
        setArticlesShown(false)
    }

    const onNewsSubmit = async (data) => {
        try {
            const response = await newsStore.createNew({...data, hider: hider.value})
            setHider('light')
        } catch (e) {
            console.log(e)
        }
    }

    const onArticlesSubmit = async (data) => {
        try {
            const response = await articlesStore.createArticle({...data, hider: hider.value})
            setHider('light')
        } catch(e) {
            console.log(e)
        }
    }

    const handleAndResetForm = (event, handleSubmit, form) => {
        handleSubmit(event)
        form.restart()
    }


    return (
        <>
            <section>
                <button onClick={() => setNewsShown(true)}>Создать NEWS</button>
                <button onClick={() => setArticlesShown(true)}>Создать ARTICLE</button>
            </section>
            {isNewsShown &&
                <div className={isNewsShown ? css.modal : null} onMouseDown={onHideModal}>
                    <Form onSubmit={onNewsSubmit} render={({ handleSubmit, form, submitting }) => (
                        <form onSubmit={(event) => handleAndResetForm(event, handleSubmit, form)} className={css.form}>
                            <Field name="title" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>Title</label>
                                        <input type='text' placeholder='title' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="subtitle" validate={composeValidators(required, mustBeDividedWithSymb)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>subtitle</label>
                                        <input type='text' placeholder='subtitle' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="quote" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>Quote</label>
                                        <input type='text' placeholder='quote' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="boldText" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>bold text</label>
                                        <input type='text' placeholder='bold text' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="text" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>Text under the bold text</label>
                                        <input type='text' placeholder='text under the bold text' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="twoColumnTextFirst" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>two column text, first column</label>
                                        <input type='text' placeholder='two column text, first column' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="twoColumnTextSecond" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>two column text, second column</label>
                                        <input type='text' placeholder='two column text, second column' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="oneColumnContent" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>one column text, under the two column text</label>
                                        <input type='text' placeholder='one column text, under the two column text' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="author" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>author</label>
                                        <input type='text' placeholder='author' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="img" validate={composeValidators(required)}>
                                {({ input: { value, onChange, ...input }, meta }) => (
                                    <div>
                                        <label>Image</label>
                                        <input type='file' placeholder='File' {...input} onChange={({ target }) => onChange(target.files)} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Select options={options} defaultValue={options[0]} value={hider} onChange={setHider} />

                            <button type="submit" disabled={submitting}>Создать новость</button>
                        </form>
                    )}>

                    </Form>
                </div>
            }

            {isArticlesShown &&
                <div className={isArticlesShown ? css.modal : null} onMouseDown={onHideModal}>
                    <Form onSubmit={onArticlesSubmit} render={({ handleSubmit, form, submitting }) => (
                        <form onSubmit={(event) => handleAndResetForm(event, handleSubmit, form)} className={css.form}>
                            <Field name="title" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>Title</label>
                                        <input type='text' placeholder='title' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="quote" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>Quote</label>
                                        <input type='text' placeholder='quote' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="boldText" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>bold text</label>
                                        <input type='text' placeholder='bold text' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="text" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>Text under the bold text</label>
                                        <input type='text' placeholder='text under the bold text' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="twoColumnTextFirst" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>two column text, first column</label>
                                        <input type='text' placeholder='two column text, first column' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="twoColumnTextSecond" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>two column text, second column</label>
                                        <input type='text' placeholder='two column text, second column' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="oneColumnContent" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>one column text, under the two column text</label>
                                        <input type='text' placeholder='one column text, under the two column text' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="address" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>adress of site source</label>
                                        <input type='text' placeholder='adress of site source' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="author" validate={composeValidators(required)}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>author</label>
                                        <input type='text' placeholder='author' {...input} />
                                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Select options={options} defaultValue={options[0]} value={hider} onChange={setHider} />

                            <button type="submit" disabled={submitting}>Создать новость</button>
                        </form>
                    )}>

                    </Form>
                </div>
            }

            <Link to={NEWS_PATH}>Перейти на news</Link>
            <br />
            <Link to={ARTICLES_PATH}>Перейти на articles</Link>
        </>
    )
}

export default AdminPanel