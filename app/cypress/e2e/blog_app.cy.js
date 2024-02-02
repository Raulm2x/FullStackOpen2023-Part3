describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'root',
      username: 'root',
      password: 'sekret'
    }

    const user2 = {
      name: 'tester',
      username: 'tester',
      password: 'simple'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in').click()
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    beforeEach(function(){
      cy.contains('Log in').click()
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#loginButton').click()

      cy.contains('root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#loginButton').click()

      cy.get('.confirmation')
        .should('contain','Wrong username or password')
        .and('have.css', 'color', 'rgb(224, 51, 51)')

      cy.get('html').should('not.contain', 'root logged in')
    })
  })

  describe('when logged in', function(){
    beforeEach(function(){
      cy.login({ username: 'root', password: 'sekret' })
      cy.createBlog({
        title:'Testing the test',
        author: 'Tester',
        url: 'https://www.test.org'
      })
      cy.contains('root logged in')
    })

    it('a new blog can be added', function(){
      cy.contains('Add blog').click()
      cy.get('#inputTitle').type('Another test subject')
      cy.get('#inputAuthor').type('Teasure hunter')
      cy.get('#inputUrl').type('https://www.teyvat.org')
      cy.get('#save-blog').click()

      cy.contains('Another test subject')
    })

    it('Details showed', function(){
      cy.contains('view').click()
      cy.contains('https://www.test.org')
    })

    it('Like Button', function(){
      cy.contains('view').click()
      cy.contains('Like').click()

      cy.contains('Likes')
        .contains('Dislike')
    })

    it('Remove button showed', function(){
      cy.contains('view').click()
      cy.contains('remove')
    })

    it('only creator should see remove button', function(){
      cy.contains('Log out')
      cy.login({ username: 'tester', password: 'simple' })
      cy.visit('')

      cy.contains('view').click()
      cy.get('.moreDetails').should('not.contain', 'remove')
    })
  })
})