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
    <div
      className="relative cursor-pointer overflow-hidden"
      onClick={() => window.open(`${link}`)}
    >
      <div className="absolute left-6 top-7 z-20 text-white">
        <div className="text-xl font-bold">{title}</div>
        <div className="mt-1 text-lg">
          {tags.split(",").map((tag, idx) => {
            return <span key={idx}>#{tag} </span>;
          })}
        </div>
      </div>
      <div className="absolute h-[175px] w-[400px] bg-gradient-to-b from-black to-transparent opacity-60" />
      <img
        className="h-[370px] w-[400px] rounded-lg"
        src={img_url}
        alt={title}
      />
    </div>
  );
}
