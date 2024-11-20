export default function PostVideo() {
  return (
    <form className="flex flex-col w-[80%] h-96 border border-stone-500 rounded-lg m-10 p-4">
      <label>Title</label>
      <input type="text" />
      <label>Description</label>
      <textarea type="text" cols={3} />
      <label>Video</label>
      <input type="file" />
      <label>Thumbnail</label>
      <input type="file" />
      <button type="submit">Submit</button>
    </form>
  );
}
