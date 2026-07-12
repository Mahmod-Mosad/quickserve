import type { LoginRequest, LoginResponse } from '../types/auth';

// ⚠️ MOCK FUNCTION — دي دالة وهمية مؤقتة، هتتستبدل بـ API حقيقي
// لما الـ backend (Spring Boot) يخلص ويبقى عنده endpoint حقيقي.
// دلوقتي بترجع بيانات وهمية بعد تأخير نص ثانية عشان تحاكي شكل الـ network request.
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  // بنستنى نص ثانية عشان نحاكي وقت استجابة السيرفر الحقيقي
  await new Promise((resolve) => setTimeout(resolve, 500));

  // فاليديشن وهمية بسيطة عشان نقدر نجرب حالة الخطأ في الواجهة
  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required');
  }

  // بيانات وهمية بترجع كأنها جاية من السيرفر
  return {
    token: 'mock-jwt-token-123',
    user: {
      id: 'mock-user-1',
      name: 'Mahmoud Test',
      email: credentials.email,
      role: 'customer',
    },
  };
}