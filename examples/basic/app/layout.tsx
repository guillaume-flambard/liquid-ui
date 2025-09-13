import './globals.css'

export const metadata = {
  title: 'Liquid UI - The Ultimate React Component Library',
  description: 'Beautiful Apple Liquid Glass components for React',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
