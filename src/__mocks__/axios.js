export const mockPost = jest.fn();
export const mockGet = jest
  .fn()
  .mockImplementation(() => Promise.resolve({ data: undefined }));
export const mockRequest = jest.fn();
export const mockPut = jest.fn();
export const mockRequestInterceptor = jest.fn();

export const mockCreate = jest.fn().mockImplementation(() => ({
  get: mockGet,
  post: mockPost,
  put: mockPut,
  interceptors: {
    request: {
      use: mockRequestInterceptor,
    },
  },
}));

module.exports = {
  mockRequestInterceptor,
  create: mockCreate,
  post: mockPost,
  put: mockPut,
  get: mockGet,
};
