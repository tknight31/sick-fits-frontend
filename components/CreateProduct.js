import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Nice shoes',
    price: 202,
    description: 'hey',
  });
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputs);
      }}
    >
      <fieldset aria-busy>
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
          Price
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
