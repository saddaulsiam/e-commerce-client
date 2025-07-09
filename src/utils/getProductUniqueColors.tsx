import { TProduct } from "@/types/common";

//? Old version
// const colors = [
//   ...new Set(
//     products?.data?.data?.flatMap((product: TProduct) =>
//       product.colors.map(({ color }) => color),
//     ),
//   ),
// ];

const getProductUniqueColors = (products: TProduct[]) => {
  const colorSet = new Set<string>();

  const colorHexList =
    products
      ?.flatMap((product: TProduct) =>
        product.colors.map((c) => (typeof c === "string" ? null : c.color)),
      )
      ?.filter((c): c is string => c !== null) || [];

  colorHexList.forEach((hex) => colorSet.add(hex));

  const colorObjects: { label: string; color: string }[] = [];

  products?.forEach((product: TProduct) => {
    product.colors.forEach((c) => {
      if (typeof c !== "string" && colorSet.has(c.color)) {
        if (
          !colorObjects.find(
            (item) => item.label === c.label && item.color === c.color,
          )
        ) {
          colorObjects.push({ label: c.label, color: c.color });
        }
      }
    });
  });

  return colorObjects;
};

export default getProductUniqueColors;
