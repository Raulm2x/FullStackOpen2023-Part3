import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogDetails from './BlogDetails'

describe('testing blog details', () => {

  const blog = {
    id: 'blog1',
    title: 'Component testing is done with react-testing-library',
    author: 'Google',
    url: 'https://www.google.com',
    likes: 0,
    user: '007',
    likedBy: []
  }

  const tester = { id: '007', username: 'tester', blogs:['blog1'], liked: [] }

  test('renders title and author by default', () => {
    const { container } = render(<BlogDetails blog={blog} />)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(div).toHaveTextContent(
      'Google'
    )
  })

  test('Does not render url and likes by default', () => {
    const { container } = render(<BlogDetails blog={blog} />)
    const div = container.querySelector('.blog')

    expect(div).not.toHaveTextContent(
      'https://www.google.com'
    )
    expect(div).not.toHaveTextContent(
      0
    )
  })

  test('Visibility of details after press view button', async () => {
    const { container } = render(<BlogDetails blog={blog} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.moreDetails')
    expect(div).toHaveTextContent('https://www.google.com')
  })

  test('Like button pressed twice', async () => {
    const mockHandler = jest.fn()
    const { container } = render(
      <BlogDetails blog={blog} user={tester} OnClick={mockHandler} />
    )
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})



