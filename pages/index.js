import { Base, HeroHead } from "./components";

function Home() {
  return (
    <>
      <HeroHead />
    </>
  );
}

const Wrapper = ({ ...props }) => (
  <Base>
    <Home {...props} />
  </Base>
);

export default Wrapper;
