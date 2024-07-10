// pages/landing-page.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Header />
      </header>
      <main className="flex-grow">
        <section
          className="bg-cover bg-center h-[50vh] flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/002/271/919/non_2x/people-enjoying-summer-vacation-at-the-beach-free-vector.jpg')",
            boxShadow: "inset 0 0 20px rgba(0, 0, 0, 2)",
            position: "relative",
          }}
        >
          <div className="bg-black/50 text-white p-8 rounded-lg text-center max-w-2xl">
            <h1 className="text-3xl font-bold mb-4">Book Your Dream Destination!</h1>
            <p className="text-lg mb-8">Plan your next adventure with our comprehensive travel services.</p>
            <div className="flex justify-center gap-4">
              <Button>Book Now</Button>
              <Button variant="secondary">Learn More</Button>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/flights-search" passHref>
                <Card className="cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-95">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <PlaneIcon className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Flights</h3>
                    <p className="text-muted-foreground">Book your flights with ease and confidence.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/destination-experiences" passHref>
                <Card className="cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-95">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <MapPinIcon className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Destination Experiences</h3>
                    <p className="text-muted-foreground">Explore the world with our curated experiences.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/cars-and-transfers" passHref>
                <Card className="cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-95">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <CarIcon className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Cars and Transfers</h3>
                    <p className="text-muted-foreground">Rent a car or book a transfer for your trip.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/market-insights" passHref>
                <Card className="cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-95">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <BarChartIcon className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Market Insights</h3>
                    <p className="text-muted-foreground">Stay informed with our latest travel market data.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/hotels" passHref>
                <Card className="cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-95">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <HotelIcon className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Hotels</h3>
                    <p className="text-muted-foreground">Find the perfect hotel for your next trip.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/itinerary-management" passHref>
                <Card className="cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-95">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <CalendarIcon className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Itinerary Management</h3>
                    <p className="text-muted-foreground">Plan and manage your trip itinerary with ease.</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function HotelIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 22v-6.57" />
      <path d="M12 11h.01" />
      <path d="M12 7h.01" />
      <path d="M14 15.43V22" />
      <path d="M15 16a5 5 0 0 0-6 0" />
      <path d="M16 11h.01" />
      <path d="M16 7h.01" />
      <path d="M8 11h.01" />
      <path d="M8 7h.01" />
      <rect x="4" y="2" width="16" height="20" rx="2" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PlaneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}
