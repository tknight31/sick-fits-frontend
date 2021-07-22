/* eslint-disable react/prop-types */
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // Get existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  // get the mutation to update product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  // state for form inputs
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);
  console.log(inputs);
  if (loading) return <p>Loading...</p>;

  // form to handle updates
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        });
        console.log(res);
        // // Submit the inputfields to backend
        // const res = await createProduct();
        // clearForm();
        // // Go to Product page
        // Router.push({
        //   pathname: `/product/${res.data.createProduct.id}`,
        // });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            onChange={handleChange}
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            onChange={handleChange}
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
