"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// SVG icon components for better code readability and reusability
function ArrowLeftRightIcon(props) {
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
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" />
      <path d="M20 17H4" />
    </svg>
  );
}

function CalendarDaysIcon(props) {
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
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ListOrderedIcon(props) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}

function MinusIcon(props) {
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
      <path d="M5 12h14" />
    </svg>
  );
}

function PlaneTakeoffIcon(props) {
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
      <path d="M2 22h20" />
      <path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SlidersVerticalIcon(props) {
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
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="2" x2="6" y1="14" y2="14" />
      <line x1="10" x2="14" y1="8" y2="8" />
      <line x1="18" x2="22" y1="16" y2="16" />
    </svg>
  );
}

function TicketIcon(props) {
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
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// Main component for searching flights
const SearchFlights = () => {
  // State hooks for managing input values and search results
  const [originLocationCode, setOriginLocationCode] = useState("");
  const [destinationLocationCode, setDestinationLocationCode] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [max, setMax] = useState(15);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [results, setResults] = useState([]);
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [sortOption, setSortOption] = useState("");
  const [showMoreCount, setShowMoreCount] = useState(15);
  const [carrierDictionary, setCarrierDictionary] = useState({});

  // Effect hook to perform search when showMoreCount or sortOption changes
  useEffect(() => {
    if (departureDate && returnDate) {
      handleSearch();
    }
  }, [showMoreCount, sortOption]);

  // Function to handle search logic and make API request
  const handleSearch = async (e) => {
    if (e) e.preventDefault(); // Prevent form submission if event exists
    try {
      const params = {
        originLocationCode,
        destinationLocationCode,
        adults,
        children,
        infants,
        max: showMoreCount,
        departureDate,
        returnDate,
        travelClass,
      };
      const response = await axios.get(
        "/test/api/flights/offers/search?" + new URLSearchParams(params)
      );
      const uniqueResults = removeDuplicates(response.data.data);
      let sortedData = uniqueResults;
      // Sort data based on the selected sort option
      if (sortOption === "cheapest") {
        sortedData = sortedData.sort((a, b) => a.price.total - b.price.total);
      } else if (sortOption === "expensive") {
        sortedData = sortedData.sort((a, b) => b.price.total - a.price.total);
      } else if (sortOption === "earliest") {
        sortedData = sortedData.sort(
          (a, b) => new Date(a.itineraries[0].segments[0].departure.at) - new Date(b.itineraries[0].segments[0].departure.at)
        );
      } else if (sortOption === "latest") {
        sortedData = sortedData.sort(
          (a, b) => new Date(b.itineraries[0].segments[0].departure.at) - new Date(a.itineraries[0].segments[0].departure.at)
        );
      }
      setResults(sortedData); // Set the results state
      setCarrierDictionary(response.data.dictionaries.carriers); // Set the carrier dictionary state
    } catch (error) {
      console.error("Error fetching flight data", error);
    }
  };

  // Function to remove duplicate flights from the results
  const removeDuplicates = (flights) => {
    const uniqueFlights = [];
    const flightIds = new Set();

    flights.forEach((flight) => {
      if (!flightIds.has(flight.id)) {
        uniqueFlights.push(flight);
        flightIds.add(flight.id);
      }
    });

    return uniqueFlights;
  };

  // Function to swap the origin and destination location codes
  const handleSwap = () => {
    setOriginLocationCode(destinationLocationCode);
    setDestinationLocationCode(originLocationCode);
  };

  // Function to format flight duration
  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0;
    const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0;
    return `${hours} Hrs., ${minutes} Mins.`;
  };

  // Function to show more search results
  const showMoreResults = () => {
    setShowMoreCount(showMoreCount + 15);
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <header className="sticky top-0 z-50">
        <Header />
      </header>
      <main className="max-w-6xl mx-auto p-6 sm:p-8 flex-grow">
        <div className="bg-background rounded-xl shadow-lg">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold mb-6">Find your next flight</h1>
            <form
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
              onSubmit={handleSearch}
            >
              {/* Input fields for origin and destination with swap button */}
              <div className="flex items-center gap-4">
                <PlaneTakeoffIcon className="w-6 h-6 text-muted-foreground" />
                <div className="flex-1">
                  <label
                    htmlFor="origin"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Origin
                  </label>
                  <Input
                    id="origin"
                    placeholder="Departure city"
                    className="mt-1"
                    value={originLocationCode}
                    onChange={(e) => setOriginLocationCode(e.target.value)}
                  />
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-8 h-8 text-muted-foreground hover:bg-muted/50 rounded-full"
                  onClick={handleSwap}
                >
                  <ArrowLeftRightIcon className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                  <label
                    htmlFor="destination"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Destination
                  </label>
                  <Input
                    id="destination"
                    placeholder="Arrival city"
                    className="mt-1"
                    value={destinationLocationCode}
                    onChange={(e) => setDestinationLocationCode(e.target.value)}
                  />
                </div>
              </div>

              {/* Input fields for departure and return dates */}
              <div className="flex items-center gap-4 ">
                <CalendarDaysIcon className="w-6 h-6 text-muted-foreground" />
                <div className="flex-1">
                  <label
                    htmlFor="departure-date"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Departure
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="departure-date"
                        variant="outline"
                        className="w-full mt-1 justify-start text-left font-normal"
                      >
                        <span>{departureDate || "Select date"}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={departureDate ? new Date(departureDate) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            setDepartureDate(date.toLocaleDateString('en-CA')); // Formats as YYYY-MM-DD
                          }
                        }}
                        disabled={(date) => date < new Date().setHours(0, 0, 0, 0)} // Disable dates before today
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="return-date"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Return
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="return-date"
                        variant="outline"
                        className="w-full mt-1 justify-start text-left font-normal"
                      >
                        <span>{returnDate || "Select date"}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={returnDate ? new Date(returnDate) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            setReturnDate(date.toLocaleDateString('en-CA')); // Formats as YYYY-MM-DD
                          }
                        }}
                        disabled={(date) => date < new Date().setHours(0, 0, 0, 0)} // Disable dates before today
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Input field for selecting number of passengers */}
              <div className="flex items-center gap-4">
                <UsersIcon className="w-6 h-6 text-muted-foreground" />
                <div className="flex-1">
                  <label
                    htmlFor="passengers"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Passengers
                  </label>
                  <Select id="passengers" className="mt-1">
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={`${adults + children + infants} ${
                          adults + children + infants === 1 ? "Passenger" : "Passengers"
                        }`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Adults</SelectLabel>
                        <div className="flex items-center gap-2 mb-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8 text-muted-foreground hover:bg-muted/50 rounded-full"
                            onClick={() => setAdults(adults > 0 ? adults - 1 : 0)}
                          >
                            <MinusIcon className="w-4 h-4" />
                          </Button>
                          <span className="font-medium">{adults}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8 text-muted-foreground hover:bg-muted/50 rounded-full"
                            onClick={() => setAdults(adults + 1)}
                          >
                            <PlusIcon className="w-4 h-4" />
                          </Button>
                        </div>
                        <SelectLabel>Children</SelectLabel>
                        <div className="flex items-center gap-2 mb-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8 text-muted-foreground hover:bg-muted/50 rounded-full"
                            onClick={() => setChildren(children > 0 ? children - 1 : 0)}
                          >
                            <MinusIcon className="w-4 h-4" />
                          </Button>
                          <span className="font-medium">{children}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8 text-muted-foreground hover:bg-muted/50 rounded-full"
                            onClick={() => setChildren(children + 1)}
                          >
                            <PlusIcon className="w-4 h-4" />
                          </Button>
                        </div>
                        <SelectLabel>Infants</SelectLabel>
                        <div className="flex items-center gap-2 mb-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8 text-muted-foreground hover:bg-muted/50 rounded-full"
                            onClick={() => setInfants(infants > 0 ? infants - 1 : 0)}
                          >
                            <MinusIcon className="w-4 h-4" />
                          </Button>
                          <span className="font-medium">{infants}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8 text-muted-foreground hover:bg-muted/50 rounded-full"
                            onClick={() => setInfants(infants + 1)}
                          >
                            <PlusIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Input field for selecting travel class */}
              <div className="flex items-center gap-4">
                <TicketIcon className="w-6 h-6 text-muted-foreground" />
                <div className="flex-1">
                  <label
                    htmlFor="class"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Class
                  </label>
                  <Select
                    id="class"
                    className="mt-1"
                    value={travelClass}
                    onValueChange={setTravelClass}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Economy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ECONOMY">Economy</SelectItem>
                        <SelectItem value="PREMIUM_ECONOMY">Premium Economy</SelectItem>
                        <SelectItem value="BUSINESS">Business</SelectItem>
                        <SelectItem value="FIRST">First</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit button to search for flights */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex items-center justify-end">
                <Button size="lg" className="w-full" type="submit">
                  Search Flights
                </Button>
              </div>
            </form>
          </div>

          {/* Filter and sort options */}
          <div className="border-t px-6 sm:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FilterIcon className="w-6 h-6 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Show results</span>
                <Input
                  type="number"
                  className="w-20"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select
                id="sort"
                className="w-40"
                value={sortOption}
                onValueChange={setSortOption}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="cheapest">Cheapest</SelectItem>
                    <SelectItem value="expensive">Most Expensive</SelectItem>
                    <SelectItem value="earliest">Earliest</SelectItem>
                    <SelectItem value="latest">Latest</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Display search results */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.length > 0 ? (
            results.map((flight) => (
              <Card key={flight.id} className="w-full max-w-lg">
                <CardContent className="grid gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      {carrierDictionary[flight.itineraries[0].segments[0].carrierCode]}
                    </div>
                    <div className="text-2xl font-bold">
                      {flight.price.total} {flight.price.currency}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="text-sm text-muted-foreground">From</div>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-medium">
                          {flight.itineraries[0].segments[0].departure.iataCode}
                        </div>
                      </div>
                      <div>
                        {new Date(flight.itineraries[0].segments[0].departure.at).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm text-muted-foreground">To</div>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-medium">
                          {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode}
                        </div>
                      </div>
                      <div>
                        {new Date(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="flex items-center justify-between flex-row gap-16">
                  <div className="text-sm text-muted-foreground">
                    Duration: {formatDuration(flight.itineraries[0].duration)}
                  </div>
                  <Button size="sm">Select</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>There are no available flights at this time.</p>
          )}
        </div>

        {/* Show more results button */}
        {results.length >= showMoreCount && (
          <div className="flex justify-center mt-8">
            <Button size="lg" onClick={showMoreResults}>
              Show More
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchFlights;
