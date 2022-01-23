import Button from "@components/ui/button";
import Image from "next/image";

export default function Cards({
  picture,
  title,
  price,
  description,
  handleClick,
  token,
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
          <button
            className=' bg-purple-dark title-font px-7 py-3 rounded-lg text-sm my-4'
            onClick={() => handleClick(token)}
          >
            BUY
          </button>
          <Button text={"VIEW"} />
        </div>
      </div>
    </artricle>
  );
}
