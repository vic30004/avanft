import Base from "@components/ui/base";
import HeroHead from "@components/heroHead";
import HowItWorks from "@components/howItWorks";
import MintedAvatars from "@components/mintedAvatars";

function Home() {
  return (
    <>
      <HeroHead />
      <HowItWorks />
      <MintedAvatars />
    </>
  );
}

const Wrapper = ({ ...props }) => (
  <Base>
    <Home {...props} />
  </Base>
);

export default Wrapper;
