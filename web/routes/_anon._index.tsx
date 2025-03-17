import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import lebron from '../assets/lebron-james-lebron.gif';
import homer from  '../assets/homer-brainrot.png';
import catscoop from  '../assets/cat-scoop.gif';
import dancingCat from  '../assets/dancing-cat-dance.gif';
import dog_tuah from  '../assets/dog talk tuah.jpg';
import hawk_tuah from  '../assets/hawk-tuah-hawk.gif';
import skibidi from  '../assets/skibidi-toilet.gif';
import subway from  '../assets/subway.gif';
import brian from  '../assets/brian-family-guy.gif';
import audioCook from '../assets/“i-said,-let-him-cook”-made-with-Voicemod-[AudioTrimmer.com].mp3';

export default function () {
  const letHimCOOK = (ur: string) => {
    //play sound
    const audio = new Audio(audioCook);
    audio.play();

    // Redirect after a short delay to ensure the sound plays
    setTimeout(() => {
      window.location.href = ur; // Replace with your desired URL
    }, 4000); // Adjust delay as needed
  };

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
        left: '-100px', // Adjust X-coordinate
        width: '250px', // Adjust size as needed
      }}
    />
{/* Homer Brainrot */}
<img 
        src={homer} 
        alt="Homer Brainrot" 
        className="absolute"
        style={{
          top: '-450px',
          left: '100px',
          width: '200px',
        }}
      />

      {/* Cat Scoop GIF */}
      <img 
        src={catscoop} 
        alt="Cat Scoop" 
        className="absolute"
        style={{
          top: '150px',
          left: '650px',
          maxWidth: '300px',
          maxHeight: '100%'
        }}
      />

      {/* Dancing Cat GIF */}
      <img 
        src={dancingCat} 
        alt="Dancing Cat" 
        className="absolute"
        style={{
          top: '-150px',
          left: '850px',
          maxWidth: '200px',
          maxHeight: '100%',
        }}
      />

      {/* Dog Tuah */}
      <img 
        src={dog_tuah} 
        alt="Dog Tuah" 
        className="absolute"
        style={{
          top: '-100px',
          left: '600px',
          width: '150px',
        }}
      />

      {/* Hawk Tuah GIF */}
      <img 
        src={hawk_tuah} 
        alt="Hawk Tuah" 
        className="absolute"
        style={{
          top: '300px',
          left: '-50px',
          width: '250px',
        }}
      />

      {/* Skibidi Toilet GIF */}
      <img 
        src={skibidi} 
        alt="Skibidi Toilet" 
        className="absolute"
        style={{
          top: '250px',
          left: '900px',
          maxWidth: '300px',
          maxHeight: '100%', 
        }}
      />

      {/* Subway GIF */}
      <img 
        src={subway} 
        alt="Subway" 
        className="absolute"
        style={{
          top: '-200px',
          left: '-425px',
          width: '350px',
        }}
      />

      {/* Brian Family Guy GIF */}
      <img 
        src={brian} 
        alt="Brian Family Guy" 
        className="absolute"
        style={{
          top: '280px',
          left: '400px',
          maxWidth: '200px',
          maxHeight: '100%',
        }}
      />
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
          onClick={() => letHimCOOK('/sign-up')}
        >
          Sign Up
          {/* <Link to="/sign-up">Sign up</Link> */}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => letHimCOOK('/sign-in')}
          
        >
        Sign in
        </Button>
        
      </CardContent>
    </Card>
    </div>
  );
}
