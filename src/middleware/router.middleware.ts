import { Next } from '@loopback/core';
import { Middleware, MiddlewareContext } from '@loopback/rest';
import path = require('path');


export const exampleMiddleware: Middleware = async (
  middlewareCtx: MiddlewareContext,
  next: Next,
) => {
  const {request, response} = middlewareCtx
  console.log('Request: %s %s', request.headers, request.method, request.originalUrl)
  try {
    // Proceed with next middleware
    const result = await next()
    const newPath = path.normalize(__dirname + '../../dist');
    response.sendFile(newPath);

    // Process response
    console.log('Response received for %s %s', request.method, request.originalUrl)
    return result;
  } catch (err) {
    // Catch errors from downstream middleware
    console.error('Error received for %s %s', request.method, request.originalUrl)
    throw err
  }
}
