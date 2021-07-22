import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Form from './styles/Form';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Nice shoes',
    price: 202,
    description: 'hey',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the inputfields to backend
        const res = await createProduct();
        clearForm();
        // Go to Product page
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            onChange={handleChange}
            required
            type="file"
            id="image"
            name="image"
          />
        </label>
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

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
