import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const newBlog = {
  id: 'blog1',
  title: 'Component testing is done with react-testing-library',
  author: 'Google',
  url: 'https://www.google.com',
  likes: 0,
  user: '007',
  likedBy: []
}

const tester = { id: '007', username: 'tester', blogs:['blog1'], liked: [] }

test('Add blog handler', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByLabelText('Title:')
  const inputAuthor = screen.getByLabelText('Author:')
  const inputUrl = screen.getByLabelText('Url:')

  const sendButton = screen.getByText('Save')

  await user.type(inputTitle, newBlog.title)
  await user.type(inputAuthor, newBlog.author)
  await user.type(inputUrl, newBlog.url)
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url)
})