import json

# Read scrapedProducts (the correct one with 112 items)
with open('c:\\Users\\Philippe\\Downloads\\lk-imports (1) - Copia\\src\\data\\scrapedProducts.json', 'r', encoding='utf-8') as f:
    unified_products = json.load(f)

# Write to products.json (unified file)
with open('c:\\Users\\Philippe\\Downloads\\lk-imports (1) - Copia\\src\\data\\products.json', 'w', encoding='utf-8') as f:
    json.dump(unified_products, f, ensure_ascii=False, indent=2)

print(f"✅ Unified file created - products.json now has {len(unified_products)} items")
print(f"✅ scrapedProducts.json can now be deleted")
