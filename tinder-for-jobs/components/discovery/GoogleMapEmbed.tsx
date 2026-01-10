interface GoogleMapEmbedProps {
  lat: number;
  lng: number;
  location: string;
}

export function GoogleMapEmbed({ lat, lng, location }: GoogleMapEmbedProps) {
  // Using OpenStreetMap embed as a free alternative (Google Maps requires API key)
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05}%2C${lat - 0.03}%2C${lng + 0.05}%2C${lat + 0.03}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-muted-foreground">Job Location</h3>
        <p className="text-sm text-foreground font-medium mt-1">{location}</p>
      </div>
      <div className="aspect-video w-full">
        <iframe
          src={mapUrl}
          className="w-full h-full border-0"
          loading="lazy"
          title="Job location map"
        />
      </div>
    </div>
  );
}
