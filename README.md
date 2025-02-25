# LeadValueAI Landing Page

A modern landing page for LeadValueAI, a service that helps businesses predict lead value and optimize ad spend.

## Technologies Used

- **Next.js 14**: React framework with server-side rendering and static site generation
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful, consistent icons

## Getting Started

### Prerequisites

- Node.js 18+ (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

"""bash
git clone <your-repository-url>
cd lead-value-ai-landing
"""

2. Install dependencies:

"""bash
npm install
# or
yarn
"""

3. Run the development server:

"""bash
npm run dev
# or
yarn dev
"""

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `app/`: Next.js app directory with route-based file system
  - `page.tsx`: Main landing page
  - `layout.tsx`: Root layout component
  - `globals.css`: Global styles including Tailwind directives
  - `api/`: API routes for dynamic functionality
- `components/`: React components
  - `LinearLandingPage.tsx`: The main landing page component
- `public/`: Static assets

## Customization

### Styling

This project uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`.

### Content

Update the content in `components/LinearLandingPage.tsx` to reflect your specific business case.

## Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

"""bash
npm install -g vercel
vercel
"""

### Other Hosting Options

You can also deploy this application to any platform that supports Node.js applications:

1. Build the application:

"""bash
npm run build
# or
yarn build
"""

2. Start the production server:

"""bash
npm run start
# or
yarn start
"""

## Performance Considerations

- The landing page uses responsive design principles for all device sizes
- Images use the placeholder API but should be replaced with real optimized images in production
- Font loading is optimized through Next.js built-in font optimization

## License

This project is licensed under the MIT License - see the LICENSE file for details. 