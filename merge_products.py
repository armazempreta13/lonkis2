import json

# Read both files
with open('c:\\Users\\Philippe\\Downloads\\lk-imports (1) - Copia\\src\\data\\products.json', 'r', encoding='utf-8') as f:
    products_data = json.load(f)

with open('c:\\Users\\Philippe\\Downloads\\lk-imports (1) - Copia\\src\\data\\scrapedProducts.json', 'r', encoding='utf-8') as f:
    scraped_data = json.load(f)

# Create a set of IDs from scrapedProducts to avoid duplicates
scraped_ids = {p.get('id') for p in scraped_data if p.get('id')}

# Merge: start with scraped products, add products.json items if not duplicated
merged = scraped_data.copy()

for product in products_data:
    product_id = product.get('id')
    if product_id and product_id not in scraped_ids:
        merged.append(product)

# Re-assign IDs to ensure they're sequential
for idx, product in enumerate(merged, 1):
    product['id'] = idx

# Sort by ID
merged.sort(key=lambda x: x.get('id', 0))

# Write unified file
with open('c:\\Users\\Philippe\\Downloads\\lk-imports (1) - Copia\\src\\data\\products.json', 'w', encoding='utf-8') as f:
    json.dump(merged, f, ensure_ascii=False, indent=2)

print(f"✅ Unified products.json - Total: {len(merged)} items (from {len(scraped_data)} + {len(products_data)} unique)")
