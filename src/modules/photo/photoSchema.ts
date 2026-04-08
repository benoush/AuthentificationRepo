import z from "zod";

const uploadAvatarSchema = z.object({
  avatar: z.string("avatar must be a string").optional(),
});

const addGalleryPhotoSchema = z.object({
  photo: z.string("photo must be a string").optional(),
});

const photoPaginationSchema = z.object({
  page: z.coerce.number("page must be a number"),
  limit: z.coerce.number("limit must be a number"),
});

const photoIdSchema = z.object({
  id: z.coerce.string("id must be a number"),
});

type UploadAvatarAttribute = z.infer<typeof uploadAvatarSchema>;
type AddGalleryPhotoAttribute = z.infer<typeof addGalleryPhotoSchema>;
type PhotoPaginationAttribute = z.infer<typeof photoPaginationSchema>;
type PhotoIdAttribute = z.infer<typeof photoIdSchema>;

export {
  UploadAvatarAttribute,
  AddGalleryPhotoAttribute,
  PhotoPaginationAttribute,
  PhotoIdAttribute,
  uploadAvatarSchema,
  addGalleryPhotoSchema,
  photoPaginationSchema,
  photoIdSchema,
};