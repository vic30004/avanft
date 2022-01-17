import { Base, HeroHead, HowItWorks } from "./components";

function Home() {
  return (
    <>
      <HeroHead />
      <HowItWorks />
    </>
  );
}

const Wrapper = ({ ...props }) => (
  <Base>
    <Home {...props} />
  </Base>
);

export default Wrapper;
