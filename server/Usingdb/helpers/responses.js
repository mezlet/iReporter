export const unauthorizedError = (res, message) => res.status(401)
  .json({ status: 401, message });

export const createdOkResponse = (res, data) => res.status(201)
  .json({ status: 201, data });

export const successResponse = (res, data) => res.status(200)
  .json({ status: 200, data });

export const badrequestError = (res, message) => res.status(400)
  .json({ status: 400, message });

export const notFoundError = (res, message) => res.status(404)
  .json({ status: 404, message });

export const conflictError = (res, message) => res.status(409)
  .json({ status: 409, message });

export const noContent = (res, message) => res.status(204)
  .json({ status: 204, message });

export const serverError = (res, message) => res.status(500)
  .json({ status: 500, message });
