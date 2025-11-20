# Sample JSON Files for Testing

This folder contains various JSON sample pairs to showcase the JSON Diff Viewer's capabilities.

## 📁 Available Samples

### 1. **User Profile Update**
- `user-profile-before.json` → `user-profile-after.json`
- **Shows**: Personal information updates, nested object changes, array modifications
- **Changes**: Age increment, email change, location move, phone number update, role additions

### 2. **Configuration Changes (Dev → Prod)**
- `config-development.json` → `config-production.json`
- **Shows**: Environment-specific configurations, nested property changes
- **Changes**: Database host/SSL settings, cache type change, logging levels, added security settings

### 3. **API Response Evolution (v1 → v2)**
- `api-response-v1.json` → `api-response-v2.json`
- **Shows**: API versioning differences, field additions, value changes
- **Changes**: Product details enhanced, discount added, tax calculations, payment method added

### 4. **Array Modifications**
- `array-simple-before.json` → `array-simple-after.json`
- **Shows**: Array element changes, additions, removals
- **Changes**: Employee updates, department changes, array element replacement

## 🎯 How to Use

1. Open the JSON Diff Viewer application
2. Copy contents from a "before" file into JSON Object 1
3. Copy contents from the corresponding "after" file into JSON Object 2
4. Click "Compare JSONs" to see the differences

## 💡 What Each Sample Demonstrates

| Sample | Demonstrates |
|--------|--------------|
| User Profile | Nested objects, array modifications, field updates |
| Configuration | Environment configs, boolean/number changes, new sections |
| API Response | Breaking/non-breaking changes, null → object, pricing updates |
| Array | Array element changes, object property additions/removals |

## 🔍 Diff Types You'll See

- 🟢 **Added** - New fields in the "after" version
- 🔴 **Removed** - Fields present in "before" but not in "after"
- 🟡 **Modified** - Fields with changed values

## 🚀 Try It!

These samples are perfect for:
- Testing the diff viewer functionality
- Understanding API versioning impacts
- Debugging configuration differences
- Learning JSON comparison techniques
- Demonstrating the tool to others
