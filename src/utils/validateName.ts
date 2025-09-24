export const validateName = (name: string): string => {
  if (name.trim() === "") {
    return "ユーザー名を入力してください。";
  }
  if (name.length > 20) {
    return "ユーザー名は20文字以内で入力してください。";
  }
  return "";
}
