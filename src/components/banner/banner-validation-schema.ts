import * as yup from 'yup';

export const bannervalidationschema = yup.object().shape({
  // subcategory_name: yup.string().required('form:error-subcategory-name-required'),
  // description: yup.string().required('form:subcategory-des-error-type-required'),
  // category_id: yup.object().shape({
  //   name: yup.string().required('Category Name is required'),
  //   id: yup.string().required('Category Name is required'),
  // }),
  // category_id: yup.object().nullable().required('Category Name is required'),
});