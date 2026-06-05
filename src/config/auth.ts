// ─────────────────────────────────────────────────────────────
// Hướng dẫn lấy GOOGLE_CLIENT_ID:
// 1. Vào https://console.cloud.google.com/
// 2. Tạo project mới (hoặc chọn project có sẵn)
// 3. APIs & Services → Credentials → Create Credentials → OAuth client ID
// 4. Application type: Web application
// 5. Authorized JavaScript origins: thêm http://localhost:5173 (dev)
//    và domain thật của bạn khi deploy (VD: https://yourdomain.com)
// 6. Copy Client ID dán vào đây
// ─────────────────────────────────────────────────────────────

export const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

// Danh sách Gmail được phép truy cập trang admin
// Để mảng rỗng [] → tất cả tài khoản Google đều vào được (đang dùng)
export const ALLOWED_EMAILS: string[] = [];
