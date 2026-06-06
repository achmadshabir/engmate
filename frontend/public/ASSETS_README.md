# EngMate Assets Guide

## 📁 Struktur Folder Aset

Letakkan file-file aset Anda di dalam folder `public/` dengan struktur berikut:

```
frontend/public/
├── logo/
│   ├── logo.svg              # Logo utama (SVG format)
│   ├── logo-white.svg        # Logo untuk dark background
│   ├── icon.svg              # Icon only (tanpa text)
│   └── favicon.ico           # Browser favicon (32x32px)
├── images/
│   ├── hero-illustration.svg # Hero section illustration
│   ├── feature-1.svg         # Feature illustrations
│   └── og-image.png          # Open Graph image (1200x630px)
└── fonts/
    └── (opsional jika ingin self-host fonts)
```

## 🎨 Spesifikasi Logo EngMate

### Logo Utama
- **Format**: SVG (scalable & lightweight)
- **Warna Primary**: #3B82F6 (Friendly Tech Blue)
- **Warna Accent**: #F59E0B (Warm Amber)
- **Style**: Modern, friendly, rounded shapes
- **Elemen**: Bisa combine text "EngMate" dengan icon sparkles/chat bubble

### Favicon
- **Size**: 32x32px, 64x64px (multi-resolution)
- **Format**: .ico atau .png
- **Design**: Simplified version dari logo icon

## 🔄 Cara Menggunakan Aset di Kode

### 1. Import di React Component
```jsx
import logo from '/logo/logo.svg';
import icon from '/logo/icon.svg';

function Header() {
  return <img src={logo} alt="EngMate Logo" />;
}
```

### 2. Direct Reference di HTML
```html
<!-- index.html -->
<link rel="icon" type="image/svg+xml" href="/logo/favicon.ico" />
<meta property="og:image" content="/images/og-image.png" />
```

### 3. CSS Background
```css
.hero {
  background-image: url('/images/hero-illustration.svg');
}
```

## ⚠️ Tips Penting

1. **Gunakan SVG untuk logo** - lebih crisp di semua ukuran layar
2. **Optimize images** - gunakan tools seperti SVGO, TinyPNG
3. **Alt text** - selalu tambahkan deskripsi untuk aksesibilitas
4. **Lazy loading** - untuk gambar besar: `<img loading="lazy" />`
5. **WebP format** - untuk foto (lebih kecil dari PNG/JPG)

## 🎯 Quick Replace Checklist

Setelah menambahkan logo/aset baru:

- [ ] Update favicon di `index.html`
- [ ] Ganti logo di `Layout.jsx` (sidebar)
- [ ] Update hero image di `Welcome.jsx`
- [ ] Update Open Graph metadata
- [ ] Test di berbagai ukuran layar
- [ ] Clear browser cache untuk melihat perubahan

## 🖼️ Contoh Logo Generator (Free Tools)

- **Canva**: canva.com (templates + AI)
- **Figma**: figma.com (design from scratch)
- **LogoMakr**: logomakr.com
- **IconScout**: iconscout.com (icons library)
- **Hugging Face**: huggingface.co/spaces/stabilityai/stable-diffusion (AI generated)

## 📝 Brand Assets Summary

**Brand Name**: EngMate
**Tagline**: Your Friendly AI English Tutor
**Primary Color**: #3B82F6 (Blue)
**Accent Color**: #F59E0B (Amber)
**Font Heading**: Poppins
**Font Body**: Inter
**Style**: Modern, friendly, accessible, clean
