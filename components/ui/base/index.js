import { Nav } from "../..";

export default function Base({ children }) {
  return (
    <>
      <Nav />
     {children}
    </>
  );
}
