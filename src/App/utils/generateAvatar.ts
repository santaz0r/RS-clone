export default function generateAvatar() {
  return `https://avatars.dicebear.com/api/personas/${(Math.random() + 1).toString(36).substring(7)}.svg`;
}
