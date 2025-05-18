
# Müşteri Yönetim Uygulaması

Bu proje, **Spring Boot (Java)** ile hazırlanmış bir backend ve **React** ile geliştirilmiş bir frontend içeren tam kapsamlı bir **Müşteri Yönetim Sistemi**dir. JWT ile güvenli giriş, müşteri kayıt yönetimi ve PostgreSQL veritabanı entegrasyonu içermektedir.

## Özellikler

### ✅ Backend (Spring Boot 3.x)
- **JWT Kimlik Doğrulama**: Tek kullanıcı için güvenli giriş
- **Müşteri CRUD API**: Müşteri ekleme, güncelleme, silme ve listeleme
- **PostgreSQL Entegrasyonu**: Veriler ilişkisel veritabanında tutulur
- **TC Kimlik No Doğrulama**: Kimlik numarası kontrolü
- **Şifre Değiştirme Özelliği**
- **CORS Yapılandırması** ile frontend erişimi

### ✅ Frontend (React)
- **Duyarlı Tasarım** (Responsive) – Tailwind CSS ile
- **Giriş Formu** – Kimlik doğrulama için
- **Müşteri Yönetim Paneli**
- **Müşteri Ekleme ve Listeleme**
- **TC Kimlik No Doğrulama**
- **Şifre Değiştirme Arayüzü**

---

## 📦 Proje Yapısı

```
customer-management-app/
├── backend/                → Spring Boot uygulaması
├── frontend/               → React uygulaması
└── application.properties  → Veritabanı ayarları
```

---

## ⚙️ Nasıl Çalıştırılır?

### 📌 Gereksinimler
- Java 17+
- Maven
- PostgreSQL (`customerdb` adında bir veritabanı)
- Node.js & npm (frontend için)

### 🚀 Backend Kurulumu

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

İlk kullanıcıyı manuel olarak veritabanına ekleyin:

```sql
INSERT INTO users (username, password) 
VALUES ('admin', '$2a$10$rDkPvvAFV6GgJjXpX5YwUOQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ'); 
-- Şifre: admin123
```

### 💻 Frontend Kurulumu

```bash
cd frontend
npm install
npm start
```

Frontend adresi: `http://localhost:3000`

---

## 🔒 Varsayılan Kullanıcı Bilgisi
- Kullanıcı adı: `admin`
- Şifre: `password`

---

## 📁 Kullanılan Teknolojiler
- **Backend**: Spring Boot, Spring Security, JWT, JPA, PostgreSQL
- **Frontend**: React, Axios, Tailwind CSS
- **Yapılandırma**: Maven, npm

---

## ✍️ Hazırlayan
Bu proje Bedirhan Tuncer tarafından TURKSAT Teknik mülakat projesi için hazırlanmıştır.
