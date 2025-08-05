export function BlogHeader({
  title,
  date,
  heroImgSrc,
  heroImgAlt,
}: {
  title: string;
  date: string;
  heroImgSrc: string;
  heroImgAlt: string;
}) {
  return (
    <header className="mb-8">
      <h1 className="text-5xl font-extrabold mb-2 text-center font-serif tracking-tight dark:text-dark-tx-primary text-tx-primary">
        {title}
      </h1>
      <div className="flex flex-col items-center text-tx-secondary text-base mb-4 font-light italic dark:text-tx-tertiary">
        <span>{date}</span>
      </div>
      <img
        src={heroImgSrc}
        alt={heroImgAlt}
        className="w-full object-cover rounded-lg mb-6 shadow dark:shadow-gray-800"
        loading="lazy"
      />
    </header>
  );
}
