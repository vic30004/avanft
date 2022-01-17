import Button from "@components/ui/button";
import Image from "next/image";

export default function Cards({
  picture,
  title,
  price,
  description,
  handleClick,
}) {
  return (
    <artricle className='w-267 py-2 my-10 border flex flex-col justify-center px-2 bg-grey shadow-lg rounded-md'>
      <div className=''>
        <Image src={picture} width={248} height={134} alt={title} />
      </div>
      <div className='px-1'>
        <div className='flex justify-between items-center my-2'>
          <h3 className='title-font'>{title}</h3>
          <span className='font-medium'>{price} eth</span>
        </div>
        <p className='w-56'>{description}</p>
        <div className='flex justify-between'>
          <Button text={"BUY"} />
          <Button text={"VIEW"} />
        </div>
      </div>
    </artricle>
  );
}
