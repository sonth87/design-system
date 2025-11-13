# DSUI Admin Dashboard - Documentation & Demo

Đây là ứng dụng demo minh họa cách tích hợp và sử dụng **DSUI Design System** như một dependency thực tế trong một dự án Next.js.

## 📋 Tổng quan

Ứng dụng này demo:
- ✅ Tích hợp DSUI như một package dependency (sử dụng bản build)
- ✅ Import components từ DSUI với tree-shaking support
- ✅ Sử dụng CSS và theme system từ DSUI
- ✅ Xây dựng giao diện admin dashboard hoàn chỉnh
- ✅ Các trang demo: Dashboard, Users, Analytics, Settings

## 🚀 Cài đặt

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
# Từ root của monorepo
pnpm install

# Build design system trước
cd apps/design-system
pnpm build

# Quay lại root và cài đặt
cd ../..
pnpm install
```

## 💻 Development

```bash
# Chạy dev server (port 3001)
cd apps/docs
pnpm dev
```

Mở trình duyệt tại: http://localhost:3001

## 📦 Cách sử dụng DSUI trong project này

### 1. Cài đặt dependency

Trong `package.json`:

```json
{
  "dependencies": {
    "dsui": "file:../design-system",
    "next": "^15.5.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

**Chú ý:** Tất cả dependencies khác (motion, date-fns, lucide-react, tailwindcss, etc.) được tự động cài đặt khi bạn cài `dsui`.

### 2. Import CSS và Theme

Trong `app/layout.tsx`:

```tsx
import "dsui/theme.css";
import "dsui/index.css";
import "dsui/animation.css";
```

### 3. Import Components

DSUI hỗ trợ tree-shaking, import từng component riêng lẻ:

```tsx
// Import individual components
import { Button } from 'dsui/button';
import { Input } from 'dsui/input';
import { Avatar } from 'dsui/avatar';
import { Badge } from 'dsui/badge';

// Sử dụng
export default function MyPage() {
  return (
    <div>
      <Button>Click me</Button>
      <Input placeholder="Type something..." />
    </div>
  );
}
```

### 4. Sử dụng trong Next.js App Router

Các components của DSUI sử dụng React hooks, cần thêm `'use client'` directive:

```tsx
'use client';

import { Button } from 'dsui/button';

export default function ClientComponent() {
  return <Button onClick={() => alert('Hello!')}>Click</Button>;
}
```

## 🎨 Components được sử dụng

Ứng dụng demo này sử dụng các components sau từ DSUI:

### Layout Components
- **Sidebar** - Navigation sidebar với collapse/expand
- **SidebarProvider** - Context provider cho sidebar

### UI Components
- **Button** - Buttons với nhiều variants
- **Input** - Text input fields
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection
- **Switch** - Toggle switches
- **Checkbox** - Checkboxes
- **Badge** - Status badges
- **Avatar** - User avatars
- **Separator** - Dividers

### Display Components
- **Tabs** - Tabbed interface
- **Dialog** - Modal dialogs
- **Tooltip** - Tooltips

## 📁 Cấu trúc Project

```
apps/docs/
├── app/
│   ├── layout.tsx          # Root layout với DSUI CSS imports
│   ├── page.tsx            # Dashboard page
│   ├── users/
│   │   └── page.tsx        # Users management page
│   ├── analytics/
│   │   └── page.tsx        # Analytics page
│   └── settings/
│       └── page.tsx        # Settings page
├── components/
│   └── admin-layout.tsx    # Shared admin layout component
└── package.json
```

## 🔧 TypeScript Configuration

Đã cấu hình path aliases trong `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 🎯 Features Demo

### Dashboard (/)
- Statistics cards với trending indicators
- Recent activity feed
- Recent users list
- Tabbed content areas

### Users (/users)
- User management table
- Search và filters
- Status badges
- User avatars
- Contact information display

### Analytics (/analytics)
- Metrics overview
- Chart placeholders (ready for chart library integration)
- Top pages analytics
- Multiple analytics tabs

### Settings (/settings)
- General settings
- Security settings
- Notification preferences
- Appearance settings
- Form components showcase

## 🚢 Production Build

```bash
# Build ứng dụng
pnpm build

# Start production server
pnpm start
```

## 📝 Notes

- **DSUI Package**: Ứng dụng này sử dụng DSUI như một file: dependency, trỏ trực tiếp vào thư mục `../design-system`
- **Build Required**: Cần build DSUI trước khi chạy docs app
- **CSS Import Order**: Quan trọng phải import CSS theo đúng thứ tự: theme.css → index.css → animation.css
- **Client Components**: Hầu hết components cần 'use client' directive trong Next.js App Router

## 🔗 Liên kết

- [DSUI Design System](../design-system)
- [Next.js Documentation](https://nextjs.org/docs)
- [Lucide Icons](https://lucide.dev)

## 📄 License

MIT
