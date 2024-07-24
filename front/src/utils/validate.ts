export const validateName = (name: string): string | null => {
  if (!/^\w+$/.test(name)) {
    return "ユーザー名は半角英数字、アンダースコアのみ使用できます。";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return "パスワードは6文字以上で入力してください。";
  }
  return null;
};
