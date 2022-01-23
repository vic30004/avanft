export default function button({ text, handleClick}) {
  return (
    <>
      <button
        className=' bg-purple-dark title-font px-7 py-3 rounded-lg text-sm my-4'
        onClick={handleClick}
      >
        {text}
      </button>
    </>
  );
}
