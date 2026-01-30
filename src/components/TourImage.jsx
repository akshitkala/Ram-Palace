export function TourImage({ image, title }) {
  return (
    <div className="absolute inset-0 z-0">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-opacity duration-700"
      />
      {/* Overlay to ensure text readability if needed, though the design is quite clean */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
