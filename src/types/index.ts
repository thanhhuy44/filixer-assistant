/* eslint-disable @typescript-eslint/no-explicit-any */

export type ApiResponse = {
  statusCode: number;
  message: string;
  data: any;
  pagination?: Pagination
};

export type QueryParams = {
  [key: string] : string | number | boolean | undefined
}

export type Pagination = {
  page: number,
  limit: number,
  total: number,
  totalPages: number
}

export type MediaAsset = {
  _id: string,
  url: string,
  fieldname: string,
  originalname: string,
  mimetype: string,
  createdAt: string,
  updatedAt: string,
}

export type User = {
  _id: string;
  fullName: string;
  avatar: MediaAsset,
  email: string,
  role: string,
  createdAt: string,
  updatedAt: string,
};

export type AssistantRoom = {
  _id: string,
  name: string,
  user: string,
  createdAt: string,
  updatedAt: string
}