import { describe, it, expect } from 'vitest'
import { GET_USERS, GET_USER, CREATE_USER, UPDATE_USER, DELETE_USER } from '../graphql/users'

describe('GraphQL Queries and Mutations', () => {
  describe('GET_USERS', () => {
    it('should be a valid GraphQL query', () => {
      expect(GET_USERS.kind).toBe('Document')
      expect(GET_USERS.definitions[0].operation).toBe('query')
    })

    it('should have correct query name', () => {
      expect(GET_USERS.definitions[0].name.value).toBe('GetUsers')
    })

    it('should query users field', () => {
      const selection = GET_USERS.definitions[0].selectionSet.selections[0]
      expect(selection.name.value).toBe('users')
    })

    it('should request correct fields', () => {
      const userFields = GET_USERS.definitions[0].selectionSet.selections[0].selectionSet.selections
      const fieldNames = userFields.map(field => field.name.value)
      
      expect(fieldNames).toContain('id')
      expect(fieldNames).toContain('name')
      expect(fieldNames).toContain('email')
      expect(fieldNames).toContain('role')
    })
  })

  describe('GET_USER', () => {
    it('should be a valid GraphQL query', () => {
      expect(GET_USER.kind).toBe('Document')
      expect(GET_USER.definitions[0].operation).toBe('query')
    })

    it('should have correct query name', () => {
      expect(GET_USER.definitions[0].name.value).toBe('GetUser')
    })

    it('should accept id variable', () => {
      const variables = GET_USER.definitions[0].variableDefinitions
      expect(variables.length).toBeGreaterThan(0)
      expect(variables[0].variable.name.value).toBe('id')
    })
  })

  describe('CREATE_USER', () => {
    it('should be a valid GraphQL mutation', () => {
      expect(CREATE_USER.kind).toBe('Document')
      expect(CREATE_USER.definitions[0].operation).toBe('mutation')
    })

    it('should have correct mutation name', () => {
      expect(CREATE_USER.definitions[0].name.value).toBe('CreateUser')
    })

    it('should accept input variable', () => {
      const variables = CREATE_USER.definitions[0].variableDefinitions
      expect(variables.length).toBeGreaterThan(0)
      expect(variables[0].variable.name.value).toBe('input')
    })
  })

  describe('UPDATE_USER', () => {
    it('should be a valid GraphQL mutation', () => {
      expect(UPDATE_USER.kind).toBe('Document')
      expect(UPDATE_USER.definitions[0].operation).toBe('mutation')
    })

    it('should have correct mutation name', () => {
      expect(UPDATE_USER.definitions[0].name.value).toBe('UpdateUser')
    })

    it('should accept id and input variables', () => {
      const variables = UPDATE_USER.definitions[0].variableDefinitions
      const variableNames = variables.map(v => v.variable.name.value)
      
      expect(variableNames).toContain('id')
      expect(variableNames).toContain('input')
    })
  })

  describe('DELETE_USER', () => {
    it('should be a valid GraphQL mutation', () => {
      expect(DELETE_USER.kind).toBe('Document')
      expect(DELETE_USER.definitions[0].operation).toBe('mutation')
    })

    it('should have correct mutation name', () => {
      expect(DELETE_USER.definitions[0].name.value).toBe('DeleteUser')
    })

    it('should accept id variable', () => {
      const variables = DELETE_USER.definitions[0].variableDefinitions
      expect(variables.length).toBeGreaterThan(0)
      expect(variables[0].variable.name.value).toBe('id')
    })

    it('should return deleted user id', () => {
      const selection = DELETE_USER.definitions[0].selectionSet.selections[0]
      const fields = selection.selectionSet.selections
      const fieldNames = fields.map(field => field.name.value)
      
      expect(fieldNames).toContain('id')
    })
  })
})
