export const validateName = (name: string): string => {
  if (name.trim() === "") {
    return "ユーザー名を入力してください。";
  }
  if (!/^[a-zA-Z0-9_一-龠ぁ-んァ-ヶー]+$/.test(name)) {
    return "ユーザー名は半角英数字、アンダースコア、日本語のみ使用できます。";
  }
  if (name.length > 20) {
    return "ユーザー名は20文字以内で入力してください。";
  }
  return "";
}
