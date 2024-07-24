export const validateName = (name: string): string => {
  if (!/^\w+$/.test(name)) {
    return "ユーザー名は半角英数字、アンダースコアのみ使用できます。";
  }
  if (name.length > 20) {
    return "ユーザー名は20文字以内で入力してください。";
  }
  return "";
};

export const validatePassword = (password: string): string => {
  if (password.length < 6) {
    return "パスワードは6文字以上で入力してください。";
  }
  return "";
};
