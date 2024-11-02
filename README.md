# 🎓 SchoolSync - Modern School Management System

A comprehensive school management system built with Next.js 15, providing a seamless experience for administrators, teachers, and students.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![Bun](https://img.shields.io/badge/Bun-1.0+-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-blue)

## ✨ Features

- 📚 Course Management
- 👨‍🏫 Teacher Dashboard
- 👨‍🎓 Student Portal
- 📊 Grade Management
- 🌍 Multi-language Support
- 📱 Responsive Design
- 🔐 Role-based Access Control

## 🚀 Tech Stack

- [Next.js 15](https://nextjs.org/) - React Framework
- [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization
- [Prisma](https://www.prisma.io/) - Database ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication

## 📋 Prerequisites

- Bun >= 1.0.0
- Node.js >= 18.17.0

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/hav2b/schoolsync.git
cd schoolsync
```

2. Install dependencies:

```bash
bun install
```

3. Copy the environment variables:

```bash
cp .env.example .env
```

4. Set up your environment variables in `.env`:

```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-secret"
NEXT_PUBLIC_API_URL="your-api-url"
```

5. Run database migrations:

```bash
bun prisma migrate dev
```

6. Start the development server:

```bash
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 🌍 Internationalization

This project supports multiple languages using `next-intl`. Available locales:

- Vietnamese (vi)
- English (en)

Add new translations in the `messages` directory:

```
messages/
  ├── vi.json
  ├── en.json
```

## 🔒 Environment Variables

Required environment variables:

| Variable              | Description                     |
| --------------------- | ------------------------------- |
| `DATABASE_URL`        | Your database connection string |
| `NEXTAUTH_SECRET`     | Secret for NextAuth.js          |
| `NEXT_PUBLIC_API_URL` | Your API URL                    |

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/)
- [Shadcn](https://twitter.com/shadcn)
- [Vercel](https://vercel.com)
- [Tailwind CSS Team](https://tailwindcss.com/)

---

Built with ❤️ using Next.js 15 and Bun
