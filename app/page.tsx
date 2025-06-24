import Link from "next/link";

export default function Main() {
  return (
    <div>
      <Link href='/auth/login'>Авторизация</Link>
      <p>Это просто главная страница, наполнение потом придумаю</p>
    </div>
  );
}