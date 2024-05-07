// Assuming Firebase is initialized in firebase-setup.js
import {
  getFirestore,
  query,
  collectionGroup,
  getDocs,
  doc, 
  getDoc 
} from "firebase/firestore";
import { app } from "../firebase-setup";

const db = getFirestore(app);
const DEFAULT_IMAGE_URL = "../../../assets/images/noArtwork.jpg";
const DEFAULT_ARTWORK_DETAILS = {
  uid:"N/A",
  name: "N/A",
  artist:"N/A",
  artworktype: "N/A",
  description: "N/A",
  imageUrl: DEFAULT_IMAGE_URL,
  releaseDate:"N/A"};
async function getArtworksWithDetails() {
  const artworksQuery = query(collectionGroup(db, "artworks"));
  const querySnapshot = await getDocs(artworksQuery);

  const artworksAndDetails = [];

  for (const doc of querySnapshot.docs) { 
    const userId = doc.ref.path.split('/')[1];
    const artworkData = doc.data(); // Ensure artworkData is defined here
    const artistFullName = await fetchUserData(userId);

    // Check if artworkData has imageUrl before proceeding
    if (artworkData.imageUrl) {
      artworksAndDetails.push({
        uid: userId || "N/A",
        name: artworkData.name || "N/A", 
        artist: artistFullName || "Unknown Artist", 
        description: artworkData.description || "N/A",
        artworktype: artworkData.type || "N/A",
        releaseDate: artworkData.creationDate || "N/A",

        imageUrl: artworkData.imageUrl,
      });
    }
  };

  // If there are fewer than 36 artworks, fill the rest with default values
  for (let i = artworksAndDetails.length; i < 50; i++) {
    artworksAndDetails.push({
      userId: "N/A",
      ...DEFAULT_ARTWORK_DETAILS,
    });
  }
  return artworksAndDetails;
}





//defualt position of artwork in relation to the walls of gallery location.
//rotation is for angel of veiw baseed on artwork.
//lenght is the number of artworks display in a single wall for the loop to itegrate
const positionsAndRotations = [
  // Front Wall
  ...Array.from({ length: 8 }, (_, i) => ({
    x: -102 + 29 * i,
    y: 4,
    z: -137,
    rotationY: 0,
  })),
  // Back Wall
  ...Array.from({ length: 8 }, (_, i) => ({
    x: -102 + 29 * i,
    y: 4,
    z: 137,
    rotationY: Math.PI,
  })),
  // Left Wall
  ...Array.from({ length: 8 }, (_, i) => ({
    x: -136,
    y: 4,
    z: -102 + 29 * i,
    rotationY: Math.PI / 2,
  })),
  // Right Wall
  ...Array.from({ length: 8 }, (_, i) => ({
    x: 138,
    y: 4,
    z: -102 + 29 * i,
    rotationY: -Math.PI / 2,
    
  })),
  
  //center wall 1 front
  ...Array.from({ length: 2 }, (_, i) => ({
    x:-102 + 29 * i,
    y: 4,
    z: 56,
    rotationY: Math.PI,
    
  })),
    //center wall 1 back
    ...Array.from({ length: 2 }, (_, i) => ({
      x:-102 + 29 * i,
      y: 4,
      z: 58,
      rotationY: Math.PI*4,
      
    })),

  //center wall 2 front
  ...Array.from({ length: 2 }, (_, i) => ({
    x:-102 + 29 * i,
    y: 4,
    z: -58,
    rotationY: Math.PI,
    
  })),
    //center wall 2 back
    ...Array.from({ length: 2 }, (_, i) => ({
      x:-102 + 29 * i,
      y: 4,
      z: -56,
      rotationY: Math.PI*4,
      
    })),
      //center wall 3 front
  //center wall 2 front
  ...Array.from({ length: 2 }, (_, i) => ({
    x:83 + 29 * i,
    y: 4,
    z: -58,
    rotationY: Math.PI,
    
  })),
    //center wall 3 back
    ...Array.from({ length: 2 }, (_, i) => ({
      x:83 + 29 * i,
      y: 4,
      z: -56,
      rotationY: Math.PI*4,
      
    })),
         //center wall 4 front
  ...Array.from({ length: 2 }, (_, i) => ({
    x:83 + 29 * i,
    y: 4,
    z: 56,
    rotationY: Math.PI,
    
  })),
    //center wall 4 back
    ...Array.from({ length: 2 }, (_, i) => ({
      x:83 + 29 * i,
      y: 4,
      z: 58,
      rotationY: Math.PI*4,
      
    })),
      //center wall 5 front
  ...Array.from({ length: 1 }, (_, i) => ({
    x: 0+ 29 * i,
    y: 4,
    z: 1,
    rotationY: Math.PI *4,
    
  })),
    //center wall 5 back
    ...Array.from({ length: 1 }, (_, i) => ({
      x:0+ 19 * i,
      y: 4,
      z: -1,
      rotationY: Math.PI,
      
    })),
];

export async function fetchAndPreparePaintingData() {
  const artworksAndDetails = await getArtworksWithDetails();
  const paintingData = artworksAndDetails.map((artwork, index) => {
    const position = positionsAndRotations[index] || { x: 0, y: 0, z: 0, rotationY: 0 }; // Default value
    return {
      imgSrc: artwork.imageUrl || DEFAULT_IMAGE_URL,
      width: 9,
      height: 7,
      position: { x: position.x, y: position.y, z: position.z },
      rotationY: position.rotationY,
      info: {
        title: artwork.name || "N/A",
        artist: artwork.artist || "N/A",
        description: artwork.description || "N/A",
        artworktype:artwork.artworktype,
        releaseDate: artwork.releaseDate || "N/A",
        uid: artwork.uid || "",
      },
    };
  });

  return paintingData;
}


async function fetchUserData(userId) {
  let fullName = "";
  const userRef = doc(db, "users", userId);
  try {
    const docSnap = await getDoc(userRef); 
    if (docSnap.exists()) {
      const userData = docSnap.data();
      fullName = `${userData.firstName || "N/A"} ${userData.lastName || "."}`;

    } else {
      fullName = "Unknown Artist";
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    fullName = "Unknown Artist";
  }
  return fullName;
}





//reset database artwork 
// async function resetArtworkDisplayedCounts() {
//   const artworksQuery = query(collectionGroup(db, "artworks"));
//   const querySnapshot = await getDocs(artworksQuery);
//   const allDisplayed = querySnapshot.docs.every(doc => doc.data().displayed > 0);

//   if (allDisplayed) {
//     const batch = db.batch(); 

//     querySnapshot.docs.forEach(doc => {
//       const artworkRef = doc.ref;
//       batch.update(artworkRef, { displayed: 0 });
//     });

//     await batch.commit(); // Commit the batch update
//     console.log('All artwork displayed counts have been reset to 0');
//   }
// }