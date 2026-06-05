# Vua Học Vua Share – Product Bio Showcase

Trang showcase sản phẩm bán hàng kết nối trực tiếp với **Google Sheets**.

## Tính năng
- Hiển thị sản phẩm dạng grid (ảnh, giá, mô tả)
- Click vào sản phẩm link thẳng lên sàn (Shopee, Lazada, TikTok Shop...)
- Tìm kiếm theo tên, mô tả, danh mục
- Lọc theo danh mục tự động từ dữ liệu
- Dữ liệu lấy real-time từ Google Sheets (CSV export)
- Responsive – hiển thị tốt trên mobile

---

## Cách kết nối Google Sheets

### Bước 1 – Tạo Google Sheet với các cột:

`id | name | image | price | originalPrice | description | link | category | badge`

- `badge`: HOT, NEW, SALE (hoặc để trống)
- `originalPrice`: để trống nếu không có giá gốc
- `link`: URL sản phẩm trên sàn thương mại điện tử

### Bước 2 – Publish sheet ra web

File → Share → Publish to web → Sheet1 → CSV → Publish

### Bước 3 – Cập nhật SHEET_ID

Mở `src/services/sheetsService.ts` và thay:
```ts
export const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
```

---

## Chạy project

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

---

## Tuỳ chỉnh Bio

Chỉnh thông tin trong `src/App.tsx` tại object `BIO`:

```ts
const BIO = {
  avatar: 'URL ảnh avatar',
  name: 'Tên shop',
  tagline: 'Slogan...',
  socials: [
    { label: 'Facebook', href: 'https://fb.com/...', emoji: '📘' },
  ],
};
```

## Tech stack
- React 19 + TypeScript + Vite 8
- Tailwind CSS v4
- PapaParse (CSV parsing)
- Lucide React (icons)
