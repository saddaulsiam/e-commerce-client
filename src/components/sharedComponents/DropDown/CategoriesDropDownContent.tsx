import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import categories from "@/data/categories";
import Link from "next/link";

const CategoriesDropDownContent = () => {
  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Categories</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {categories.map((category, idx) => (
        <DropdownMenuSub key={idx}>
          <DropdownMenuSubTrigger>{category.name}</DropdownMenuSubTrigger>

          <DropdownMenuSubContent>
            <DropdownMenuLabel>{category.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {category.subcategories.map((sub, subIdx) => (
              <DropdownMenuSub key={subIdx}>
                <DropdownMenuSubTrigger>{sub.name}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuLabel>{sub.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {sub.subcategories.map((item, itemIdx) => (
                    <DropdownMenuItem asChild key={itemIdx}>
                      <Link href={`/product?category=${item.href}`}>
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      ))}
    </DropdownMenuContent>
  );
};

export default CategoriesDropDownContent;
