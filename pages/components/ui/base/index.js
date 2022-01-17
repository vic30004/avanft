import { Nav } from "../..";

export default function Base({ children }) {
  return (
    <div className='max-w '>
      <Nav />
      <div className='fit'>{children}</div>
    </div>
  );
}
