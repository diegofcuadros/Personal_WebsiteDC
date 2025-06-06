interface YouTubeEmbedProps {
  videoId: string;
  width?: string | number;
  height?: string | number;
  title?: string;
  className?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  width = "100%",
  height = "315",
  title = "YouTube video player",
  className = ""
}) => {
  return (
    <div className={`aspect-w-16 aspect-h-9 ${className}`}>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
