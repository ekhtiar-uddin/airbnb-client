import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";

const Map = ({ properties }) => {
  const mapContainerRef = useRef(null);
  // const filters = useAppSelector((state) => state.global.filters);

  console.log("ksdjfksdfj", properties);

  useEffect(() => {
    if (!properties) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      // center: filters?.coordinates || [90.3731, 23.7465],
      center: [90.3731, 23.7465],
      zoom: 5,
    });

    Array.isArray(properties) &&
      properties.forEach((property) => {
        const marker = createPropertyMarker(property, map);
        const markerElement = marker.getElement();
        const path = markerElement.querySelector("path[fill='#3FB1CE']");
        if (path) path.setAttribute("fill", "#000000");
      });

    map.on("load", () => {
      if (properties?.length > 0) {
        // Calculate bounds for all properties
        const bounds = new maplibregl.LngLatBounds();

        properties.forEach((property) => {
          const [lng, lat] = property?.location?.coordinates?.coordinates || [];
          if (lng && lat) {
            bounds.extend([lng, lat]);
          }
        });

        if (properties.length === 1) {
          // Single property: center and zoom to show neighborhood
          const [lng, lat] = properties[0]?.location?.coordinates?.coordinates;
          map.flyTo({
            center: [lng, lat],
            zoom: 14, // Perfect zoom for single property with street names visible
            speed: 1.6,
          });
        } else {
          // Multiple properties: fit all markers with proper padding
          map.fitBounds(bounds, {
            padding: {
              top: 50,
              bottom: 80,
              left: 50,
              right: 50,
            },
            maxZoom: 15, // Prevent over-zooming when properties are very close
            duration: 1500,
          });
        }
      } else {
        // No properties: show default location
        map.flyTo({
          // center: filters?.coordinates || [90.3731, 23.7465],
          center: [90.3731, 23.7465],
          zoom: 10,
          speed: 1.7,
        });
      }
    });

    const resizeMap = () => {
      if (map) setTimeout(() => map.resize(), 700);
    };
    resizeMap();

    return () => map.remove();
  }, [properties]);
  // filters.coordinates

  if (!properties) return <div>Failed to fetch properties</div>;

  return (
    <div className="mt-5 border-2 border-white w-[767px] xl:h-[752px] 2xs:h-[75vh]  relative rounded-xl">
      <div
        className="map-container rounded-xl"
        ref={mapContainerRef}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

const createPropertyMarker = (property, map) => {
  const marker = new maplibregl.Marker()
    .setLngLat([
      property?.location?.coordinates?.coordinates?.[0],
      property?.location?.coordinates?.coordinates?.[1],
    ])
    .setPopup(
      new maplibregl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
      }).setHTML(
        `
        <div class="marker-popup">
          <div class="marker-popup-image"></div>
          <div>
            <a href="/search/${property?._id}" target="_blank" class="marker-popup-title">${property?.name}</a>
            <p class="marker-popup-price">
              $${property?.price}
              <span class="marker-popup-price-unit"> / month</span>
            </p>
          </div>
        </div>
        `
      )
    )
    .addTo(map);
  return marker;
};

export default Map;
