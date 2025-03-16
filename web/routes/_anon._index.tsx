import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import lebron from '../assets/lebron-james-lebron.gif'

export default function () {
  return (
    <div className="relative">
    {/* Absolutely positioned GIF */
      
    }
    <img 
      src={lebron} 
      alt="THE G.O.A.T" 
      className="absolute top-0 left-0 w-full"
      style={{
        top: '-175px', // Adjust Y-coordinate
        left: '-350px', // Adjust X-coordinate
        width: '250px', // Adjust size as needed
      }}
    />
    {}
    <Card className="p-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">👋 Hey, Pookie</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base">
          Start building your app&apos;s signed out area in 
            web/routes/_anon._index.jsx
        </p>
        
        <Button
          variant="default"
          size="lg"
          className="w-full"
          asChild
        >
          <Link to="/sign-up">Sign up</Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          asChild
        >
          <Link to="/sign-in">Sign in</Link>
        </Button>
        
      </CardContent>
    </Card>
    </div>
  );
}
