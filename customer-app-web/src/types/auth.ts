// شكل بيانات المستخدم اللي بترجع من الـ backend بعد تسجيل الدخول
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'driver' | 'admin';
}

// شكل البيانات اللي بنبعتها احنا لما نعمل login
export interface LoginRequest {
  email: string;
  password: string;
}

// شكل الرد اللي متوقعينه من الـ backend
export interface LoginResponse {
  token: string;
  user: User;
}