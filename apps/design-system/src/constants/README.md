# Theme Constants

## Cấu trúc

File `theme.ts` được cấu trúc để tách biệt **metadata** và **giá trị** của theme variables:

### 1. `THEME_VARIABLES` - Metadata chung
Chứa thông tin về các biến CSS **không bao gồm giá trị cụ thể**:
- `name`: Tên hiển thị
- `cssVar`: Tên biến CSS (ví dụ: `--primary`)
- `description`: Mô tả công dụng
- `category`: Loại (`color`, `size`, `other`)
- `group`: Nhóm phân loại (`base`, `brand`, `surface`, `state`, `chart`, `sidebar`)

### 2. Theme Values - Giá trị theo từng theme

#### `LIGHT_THEME`
Object chứa giá trị cho light theme:
```typescript
{
  "--background": "#ffffff",
  "--foreground": "#2e3a5b",
  // ...
}
```

#### `DARK_THEME`
Object chứa giá trị cho dark theme:
```typescript
{
  "--background": "#0a0a0a",
  "--foreground": "#fafafa",
  // ...
}
```

### 3. Helper Function

#### `getThemeWithValues(themeValues: ThemeValues)`
Merge metadata với giá trị của một theme cụ thể:
```typescript
const lightVariables = getThemeWithValues(LIGHT_THEME);
// Returns: Array<ThemeVariable & { value: string }>
```

## Các nhóm Theme Variables

### Base Colors
Màu nền và chữ cơ bản:
- Background, Foreground
- Muted Foreground, Subtle Foreground
- Radius (size)

### Brand Colors
Màu thương hiệu:
- Primary & Primary Foreground
- Secondary & Secondary Foreground

### Surface Colors
Màu bề mặt cho các components:
- Card, Popover
- Muted, Accent
- Foreground variants

### State Colors
Màu cho các trạng thái:
- Destructive & Destructive Foreground
- Border, Input, Ring

### Chart Colors
Màu cho biểu đồ:
- Chart 1-5

### Sidebar Colors
Màu cho sidebar:
- Sidebar background & foreground
- Sidebar variants (Primary, Accent, Border, Ring)

## Cách sử dụng

### Trong Component

```typescript
import { LIGHT_THEME, DARK_THEME, getThemeWithValues } from './constants/theme';

// Lấy theme variables với giá trị
const lightVariables = getThemeWithValues(LIGHT_THEME);
const darkVariables = getThemeWithValues(DARK_THEME);

// Apply theme
lightVariables.forEach(v => {
  document.documentElement.style.setProperty(v.cssVar, v.value);
});
```

### Thêm Theme Mới

1. Tạo object mới với tất cả các CSS variables:
```typescript
export const ROSE_THEME: ThemeValues = {
  "--background": "oklch(0.98 0.02 340)",
  "--foreground": "oklch(0.2 0.02 340)",
  // ... tất cả các biến khác
};
```

2. Sử dụng với `getThemeWithValues`:
```typescript
const roseVariables = getThemeWithValues(ROSE_THEME);
```

## Lợi ích của cấu trúc này

1. **DRY (Don't Repeat Yourself)**: Metadata chỉ định nghĩa một lần
2. **Dễ thêm theme mới**: Chỉ cần thêm object values
3. **Type-safe**: TypeScript đảm bảo đầy đủ các biến cần thiết
4. **Phân nhóm rõ ràng**: Dễ tìm và quản lý theo nhóm chức năng
5. **Scalable**: Dễ mở rộng khi thêm biến mới
