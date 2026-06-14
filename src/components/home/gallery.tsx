import { getContent } from "@/lib/content";
import { GalleryGrid, type GalleryItem } from "./gallery-grid";

const COLS: string[][] = [
  [
    "/images/tramas/trama-01.jpg",
    "/images/tramas/trama-05.jpeg",
    "/images/tramas/trama-09.jpeg",
    "/images/tramas/trama-13.jpeg",
    "/images/tramas/trama-17.jpeg",
  ],
  [
    "/images/tramas/trama-02.jpg",
    "/images/tramas/trama-06.jpg",
    "/images/tramas/trama-10.jpeg",
    "/images/tramas/trama-14.jpeg",
    "/images/tramas/trama-18.jpeg",
  ],
  [
    "/images/tramas/trama-03.jpg",
    "/images/tramas/trama-07.jpg",
    "/images/tramas/trama-11.jpeg",
    "/images/tramas/trama-15.jpeg",
    "/images/QHgEdXTMAbNex3rOnTBHmoMm64.jpg",
  ],
  [
    "/images/tramas/trama-04.jpg",
    "/images/tramas/trama-08.jpg",
    "/images/tramas/trama-12.jpeg",
    "/images/tramas/trama-16.jpeg",
    "/images/4tbLJsG61TwNnjRLrrMZds9IWx0.webp",
  ],
];

export async function GallerySection() {
  const cols: GalleryItem[][] = await Promise.all(
    COLS.map((images, c) =>
      Promise.all(
        images.map(async (src, r) => {
          const key = `home.gallery.col${c + 1}.item${r + 1}`;
          const value = await getContent(key, { url: src, alt: "" });
          return { key, url: value.url, alt: value.alt ?? "" };
        }),
      ),
    ),
  );

  return <GalleryGrid cols={cols} />;
}
