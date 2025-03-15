"use client";

export const BrandFilter = ({ selectedBrand, onBrandChange, brands }) => {
  const handleBrandToggle = (brand: string) => {
    // If the selected brand is already active, clear the filter
    if (selectedBrand === brand) {
      onBrandChange(undefined); // Set to undefined when deselected
    } else {
      onBrandChange(brand); // Set to the selected brand
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900">Brand</h4>
      <div className="space-y-2">
        {brands.map((brand) => (
          <label
            key={brand}
            className="flex cursor-pointer items-center space-x-2"
          >
            <input
              type="checkbox"
              checked={selectedBrand === brand} // Check if the current brand is selected
              onChange={() => handleBrandToggle(brand)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-600">{brand}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
