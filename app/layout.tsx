
import './globals.css'

export const metadata = {
  title: "Charly VERDIERE-PARENT — Portfolio BUT GEII",
  description: "Portfolio de Charly VERDIERE-PARENT, étudiant en BUT GEII spécialisé en automatisme et informatique industrielle, alternant chez Ampère Electricity (Renault) à Douai.",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0e1012",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
