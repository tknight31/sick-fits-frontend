import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange } = useForm({
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
    </form>
  );
}
