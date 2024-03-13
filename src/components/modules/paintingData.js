// Assuming Firebase is initialized in firebase-setup.js
import { getFirestore, query, collectionGroup, getDocs } from "firebase/firestore";
import { app } from "../firebase-setup";

const db = getFirestore(app);

const DEFAULT_IMAGE_URL = "../../../assets/images/noArtwork.jpg";
const DEFAULT_ARTWORK_DETAILS = {
  name: "N/A",
  type: "N/A",
  description: "N/A",
  imageUrl: DEFAULT_IMAGE_URL,
  // ... any other default values
};

async function getArtworksWithDetails() {
  const artworksQuery = query(collectionGroup(db, "artworks"));
  const querySnapshot = await getDocs(artworksQuery);

  const artworksAndDetails = [];

  querySnapshot.forEach((doc) => {
    // Extract parent document ID (user ID)
    const userId = doc.ref.path.split('/')[1];
    const artworkData = doc.data();

    // Assuming each artwork document contains a field 'imageUrl'
    if (artworkData.imageUrl) {
      artworksAndDetails.push({
        userId: userId,
        ...artworkData,
      });
    }
  });

  // If there are fewer than 24 artworks, fill the rest with default values
  for (let i = artworksAndDetails.length; i < 24; i++) {
    artworksAndDetails.push({
      userId: "N/A",
      ...DEFAULT_ARTWORK_DETAILS,
    });
  }

  // Now, artworksAndDetails contains at least 24 elements
  return artworksAndDetails;
}

// Call the function and handle the results
getArtworksWithDetails().then((artworksAndDetails) => {
  // Output the array with artworks and user details
  console.log('Retrieved artworks and details:', artworksAndDetails);
}).catch((error) => {
  console.error("Error getting artworks and details: ", error);
});



export const paintingData = [
  // Front Wall
  ...Array.from({
        length: 6
    }, (_, i) => ( {
      
        // Array.from creates an array from an array-like object. The first parameter is the array-like object. The second parameter is a map function that is called for each element in the array-like object. The map function takes two parameters: the element and the index. The map function returns the value that will be added to the new array. In this case, we are returning an object with the painting data. `_` is a placeholder for the element. We don't need it because we are not using the element. `i` is the index. We use it to set the painting number.
        imgSrc: artworksAndDetails[i].imageUrl, // `i + 1` is the painting number. We add 1 to the index because the index starts at 0 but we want the painting numbers to start at 1.
        width: 6, // width of the painting
        height: 4, // height of the painting
        position: {
            x: -26 + 10 * i,
            y: 2,
            z: -34.5
        }, // position of the painting
        rotationY: 0, // rotation of the painting
        info: {
            // info about the painting
            title: `Van Gogh ${i + 1}`,
            artist: 'Vincent van Gogh',
            description: `This is one of the masterpieces by Vincent van Gogh, showcasing his unique style and emotional honesty. Artwork ${
        i + 1
      } perfectly encapsulates his love for the beauty of everyday life.`,
            year: `Year ${i + 1}`,
            link: '',
        },
    })),
  // Back Wall
  ...Array.from({
        length: 6
    }, (_, i) => ({
        imgSrc: `../../assets//artworks/${i + 5}.jpg`,
        width: 6, // width of the painting
        height: 4, // height of the painting
        position: {
            x: -25 + 10 * i,
            y: 2,
            z: 34.5
        },
        rotationY: Math.PI,
        info: {
            title: `Van Gogh ${i + 5}`,
            artist: 'Vincent van Gogh',
            description: `Artwork ${
        i + 5
      } by Vincent van Gogh is an exceptional piece showcasing his remarkable ability to capture emotion and atmosphere.`,
            year: `Year ${i + 5}`,
            link: '',
        },
    })),
  // Left Wall
  ...Array.from({
        length: 6
    }, (_, i) => ({
        imgSrc: `../../assets//artworks/${i + 9}.jpg`,
        width: 6, // width of the painting
        height: 4, // height of the painting
        position: {
            x: -34.6,
            y: 2,
            z: -22 + 10 * i
        },
        rotationY: Math.PI / 2,
        info: {
            title: `Van Gogh ${i + 9}`,
            artist: 'Vincent van Gogh',
            description: `With its striking use of color and brushwork, Artwork ${
        i + 9
      } is a testament to Van Gogh's artistic genius.`,
            year: `Year ${i + 9}`,
            link: '',
        },
    })),
  // Right Wall
  ...Array.from({
        length: 6
    }, (_, i) => ({
        imgSrc: `../../assets//artworks/${i + 13}.jpg`,
        width: 6, // width of the painting
        height: 4, // height of the painting
        position: {
            x: 33.5,
            y: 2,
            z: -23 + 10 * i
        },
        rotationY: -Math.PI / 2,
        info: {
            title: `Van Gogh ${i + 13}`,
            artist: 'Vincent van Gogh',
            description: `Artwork ${
        i + 13
      } is a captivating piece by Vincent van Gogh, reflecting his distinctive style and deep passion for art.`,
            year: `Year ${i + 13}`,
            link: '',
        },
    })),
];
