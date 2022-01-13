import { Nav } from "../..";

export default function Base({ childern }) {
  return (
    <Nav>
      <div className='fit'>{childern}</div>
    </Nav>
  );
}
