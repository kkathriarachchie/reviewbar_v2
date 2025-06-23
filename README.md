# ReviewBar v2 🛍️

An Augmented Product Review App that revolutionizes how consumers access and share product information through barcode scanning technology.

## 📖 Description

In today's fast-paced retail environment, consumers are overwhelmed with countless product choices across various categories. ReviewBar addresses this challenge by providing a cutting-edge mobile web application that leverages barcode scanning technology to deliver instant access to authentic product reviews and ratings.

### Key Features

- **Barcode Scanning**: Scan product barcodes to instantly access reviews
- **User-Generated Reviews**: Add and share your product experiences
- **Real-time Information**: Get up-to-date product ratings and feedback
- **Universal Product Code Integration**: Utilizes GS1-regulated UPC system for global product identification
- **Mobile-First Design**: Optimized for on-the-go shopping experiences

### Why ReviewBar?

- **Informed Decision Making**: Access credible reviews before making purchases
- **Physical Retail Integration**: Bridge the gap between online reviews and in-store shopping
- **Community-Driven**: Build a reliable network of authentic product feedback
- **Global Standards**: Built on GS1 trade standards for universal product identification

## 🚀 Installation Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB database

### Setup Steps

1. **Clone the repository**

```bash
git clone https://github.com/kkathriarachchie/reviewbar_v2.git
```

2. **Navigate to project directory**

```bash
cd reviewbar_v2
```

3. **Install dependencies**

```bash
npm install
```

4. **Environment Configuration**
   Create a `.env.local` file in the root directory and add your environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

5. **Build the server**

```bash
npm run build:server
```

6. **Start the development environment**

```bash
npm run dev:all
```

This will start both the Next.js frontend and Express.js backend concurrently.

### Available Scripts

- `npm run dev` - Start Next.js development server with Turbopack
- `npm run build` - Build the Next.js application for production
- `npm run start` - Start the production server
- `npm run server` - Start the Express.js backend server
- `npm run dev:all` - Start both frontend and backend in development mode
- `npm run lint` - Run ESLint for code quality checks

## 🛠️ Technologies Used

### Frontend

- **Next.js 15.3.3** - React framework for production
- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives

### Backend

- **Express.js 5** - Web application framework for Node.js
- **MongoDB** - NoSQL database with Mongoose ODM
- **TypeScript** - Server-side type safety

### Key Libraries & Tools

- **Barcode Scanning**: `react-qr-barcode-scanner`, `react-barcode-scanner`
- **Form Management**: `react-hook-form` with `zod` validation
- **UI Components**: Radix UI primitives with custom styling
- **Security**: Google reCAPTCHA integration
- **Development**: Turbopack for fast development builds

### Development Tools

- **ESLint** - Code linting and formatting
- **Concurrently** - Run multiple commands simultaneously
- **ts-node-dev** - TypeScript execution with hot reload

## 📱 Screenshots

### App Interface Showcase

<table>
<tr>
<th>Feature</th>
<th>🌙 Dark Mode</th>
<th>☀️ Light Mode</th>
</tr>
<tr>
<td><strong>Barcode Scanner Interface</strong></td>
<td><img src="/public/Screenshots/Barcode scanner interface-dark_mode.png" alt="Scanner Dark" width="250"/></td>
<td><img src="/public/Screenshots/Barcode scanner interface-light_mode.png" alt="Scanner Light" width="250"/></td>
</tr>
<tr>
<td><strong>Product Review Listings</strong></td>
<td><img src="/public/Screenshots/Product review listings-dark_mode.png" alt="Listings Dark" width="250"/></td>
<td><img src="/public/Screenshots/Product review listings-light_mode.png" alt="Listings Light" width="250"/></td>
</tr>
<tr>
<td><strong>Review Submission Form</strong></td>
<td><img src="/public/Screenshots/Review submission form-dark_mode.png" alt="Form Dark" width="250"/></td>
<td><img src="/public/Screenshots/Review submission form-light_mode.png" alt="Form Light" width="250"/></td>
</tr>
</table>

### Key App Screens:

- Barcode scanner interface
- Product review listings
- Review submission form

## 👥 Contact / Authors

**Developer**: [Your Name]

- GitHub: [@kkathriarachchie](https://github.com/kkathriarachchie)
- Email: [kkathriarachchie@gmail.com](mailto:kkathriarachchie"@gmail.com)
- LinkedIn: [www.linkedin.com/in/kavishka-kathriarachchi](https://www.linkedin.com/in/kavishka-kathriarachchi)

## 🌟 Acknowledgments

- **GS1 Lanka** (https://gs1lanka.org) - For UPC barcode standards and licensing in Sri Lanka
- **GS1 Global** - For Universal Product Code trade standards

## 📄 License

This project is private and proprietary.

## 🚧 Project Status

Currently in active development (version 2.0).

---

_Built with ❤️ to empower informed consumer decisions through technology_
