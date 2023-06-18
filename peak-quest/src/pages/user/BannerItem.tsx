
interface propBanner {
  banner: bannerData;
}

interface bannerData {
  img_url: string;
  link: string;
  tags: string;
  title: string;
}

export default function BannerItem({ banner }: propBanner) {
  const { img_url, link, title, tags } = banner;

  return (
    <div className="relative cursor-pointer overflow-hidden" onClick={() => window.open(`${link}`)}>
      <div className="absolute top-7 left-6 text-white z-20">
        <div className="text-xl font-bold">{title}</div>
        <div className="mt-1 text-lg">
          {tags.split(",").map((tag) => {
            return <span>#{tag} </span>;
          })}
        </div>
      </div>
      <div className="absolute w-[400px] h-[175px] bg-gradient-to-b from-black to-transparent opacity-60" />
      <img className="w-[400px] h-[370px] rounded-lg" src={img_url} alt={title} />
    </div>
  );
}