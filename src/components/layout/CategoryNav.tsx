import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "@/redux/api/apiSlice";

const fallbackCategories = [
  {
    category_name: "Immobilier",
    slug: "immobilier",
    subcategories: [
      { subcategory_name: "Appartements", slug: "appartements" },
      { subcategory_name: "Maisons", slug: "maisons" },
      { subcategory_name: "Terrains", slug: "terrains" },
      { subcategory_name: "Bureaux & Commerces", slug: "bureaux-commerces" },
    ],
  },
  {
    category_name: "Véhicules",
    slug: "vehicules",
    subcategories: [
      { subcategory_name: "Voitures", slug: "voitures" },
      { subcategory_name: "Motos", slug: "motos" },
      { subcategory_name: "Véhicules utilitaires", slug: "vehicules-utilitaires" },
      { subcategory_name: "Pièces & Accessoires", slug: "pieces-accessoires" },
    ],
  },
];

export function CategoryNav() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const { data, isLoading } = useGetCategoriesQuery();
  const categories = data?.categories?.length ? data.categories : fallbackCategories;

  const openMenu = (name: string) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setHoveredCategory(name);
  };

  const scheduleClose = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setHoveredCategory(null);
      closeTimeoutRef.current = null;
    }, 150);
  };

  return (
    <nav className="bg-gradient-subtle/60 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex space-x-8">
            {categories.map((category) => {
              const categoryLabel = category.category_name || (category as any).name || "Catégorie";
              const categorySlug =
                category.slug ||
                categoryLabel.toLowerCase().replace(/\s+/g, "-");
              return (
                <div
                  key={categorySlug}
                  className="relative"
                  onMouseEnter={() => openMenu(categorySlug)}
                  onMouseLeave={scheduleClose}
                >
                  <button className="nav-link flex items-center group">
                    {categoryLabel}
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Dropdown */}
                  {hoveredCategory === categorySlug && (
                    <div
                      className="absolute top-full left-0 w-56 dropdown-panel z-50"
                      onMouseEnter={() => openMenu(categorySlug)}
                      onMouseLeave={scheduleClose}
                    >
                      {category.subcategories?.map((subcategory: any) => {
                        const subLabel =
                          typeof subcategory === "string"
                            ? subcategory
                            : subcategory.subcategory_name;
                        const subSlug =
                          typeof subcategory === "string"
                            ? subcategory.toLowerCase().replace(/\s+/g, "-")
                            : subcategory.slug;
                        return (
                          <Link
                            key={`${categorySlug}-${subSlug}`}
                            to={`/categorie/${categorySlug}/${subSlug}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                          >
                            {subLabel}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}