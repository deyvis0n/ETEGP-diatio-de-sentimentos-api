import { Authentication } from '../../../domain/usercase/authentication'
import { MissingParamError } from '../../erros/missing-param-error'
import { badRequest } from '../../helper/http/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller } from '../../protocols/signup'

export class LoginController implements Controller {
  constructor (private readonly authentication: Authentication) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const { email, password } = httpRequest.body
    await this.authentication.auth({ email, password })
    return null
  }
}
