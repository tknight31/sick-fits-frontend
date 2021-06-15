import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice shoes',
    price: 202,
    description: 'hey',
  });
  return (
    <form>
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

      <button type="button" onClick={clearForm}>
        Clear Form
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
}
