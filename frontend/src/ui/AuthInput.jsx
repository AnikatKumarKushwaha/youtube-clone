/* eslint-disable react/prop-types */
export default function AuthInput({
  type,
  placeholder,
  id,
  register,
  validation,
  error,
}) {
  return (
    <div>
      <label className="uppercase text-sm text-stone-500">{id}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        {...register(id, validation)}
        className="w-full outline-none border border-stone-400 rounded-2xl px-4 py-2 focus:border-slate-700 focus:border-2"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}{" "}
      {/* Display errors */}
    </div>
  );
}
