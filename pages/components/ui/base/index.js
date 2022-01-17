import { Nav } from "../..";

export default function Base({ children }) {
  console.log(children);
  return (
    <>
      <Nav />
     {children}
    </>
  );
}
