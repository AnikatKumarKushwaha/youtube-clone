export default function VideoCard({ thumbnail, title }) {
  return (
    <div>
      <div>
        <img src={thumbnail} alt="videos" />
      </div>
      <div>{title}</div>
    </div>
  );
}
