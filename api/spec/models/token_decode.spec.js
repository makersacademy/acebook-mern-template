const tokenDecoder = require("../../models/token_decode")
const JWT = require("jsonwebtoken")

describe("tokenDecoder", () => {
  describe("jsonwebtoken", () => {
    test("should decode a valid token", () => {
      const token = JWT.sign({ id: 1 }, "secret")
      console. log(token)
      const decoded = tokenDecoder(token)
      expect(decoded.id).toBe(1)
    })

    test("should give the user_id from a valid token", () => {
      const decoded = tokenDecoder("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ4MWJiYWU4MmJhZTIzMmNjMGU1OThlIiwiaWF0IjoxNjg2MjIzNzk0LCJleHAiOjE2ODYyMjQzOTR9.udO6Nzs6vYiMgo1TK4Egw2UQDyZMrhnZjmvX6X4tFpU")
      expect(decoded.user_id).toBe("6481bbae82bae232cc0e598e")
    })
  })
})